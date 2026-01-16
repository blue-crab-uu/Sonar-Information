import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import "../styles/dev-sync-status.css"
import {  Link } from "gatsby"
const DevSyncStatusImportantPage = () => {
  const [syncData, setSyncData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 获取同步状态数据
  const fetchSyncStatus = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:3000/fetch-important-space-information')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setSyncData(result.data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching sync status:', err)
    } finally {
      setLoading(false)
    }
  }

  // // 调用另一个 API 的示例（可根据需要修改）
  // const callSecondaryAPI = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/fetch-space-to-important', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       // body: JSON.stringify({ /* your data */ })
  //     })
  //     const result = await response.json()
  //     alert('API 调用成功: ' + JSON.stringify(result))
  //   } catch (err) {
  //     alert('API 调用失败: ' + err.message)
  //   }
  // }

  // 组件挂载时自动获取数据
  useEffect(() => {
    fetchSyncStatus()
  }, [])

  // 只在开发环境显示，生产环境返回 404
  if (process.env.NODE_ENV !== 'development') {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h1>404 - 页面未找到</h1>
          <p>此页面仅在开发环境可用</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="dev-sync-container">
        <div className="dev-sync-header">
          <h1>🔧 开发者面板 - 同步状态</h1>
          <p>此页面仅在本地开发环境显示</p>
        </div>

        <div className="dev-sync-controls">
          <button 
            className="dev-btn dev-btn-primary"
            onClick={fetchSyncStatus}
            disabled={loading}
          >
            {loading ? '加载中...' : '🔄 刷新数据'}
          </button>

          <Link to="/dev-sync-status-allspace" className="dev-btn dev-btn-secondary">
              返回全部空间同步状态页面
            </Link>
        </div>

        {error && (
          <div className="dev-sync-error">
            ❌ 错误: {error}
          </div>
        )}
         <div className="dev-sync-stats">
          <h3>📊 统计摘要</h3>
          {syncData && syncData.length > 0 && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">总 Spaces</div>
                <div className="stat-value">{syncData.length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">需要同步</div>
                <div className="stat-value" style={{ color: '#ef4444' }}>
                  {syncData.filter(s => s.needsSync).length}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">已同步</div>
                <div className="stat-value" style={{ color: '#10b981' }}>
                  {syncData.filter(s => !s.needsSync).length}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">总提案数</div>
                <div className="stat-value">
                  {syncData.reduce((sum, s) => sum + s.proposalsCount, 0)}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">已翻译提案</div>
                <div className="stat-value" style={{ color: '#3b82f6' }}>
                  {syncData.reduce((sum, s) => sum + s.translatedProposalsCount, 0)}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">平均翻译率</div>
                <div className="stat-value">
                  {(syncData.reduce((sum, s) => sum + s.translationPercentage, 0) / syncData.length).toFixed(1)}%
                </div>
              </div>
            </div>
          )}
        </div>
        {loading && !syncData ? (
          <div className="dev-sync-loading">
            ⏳ 加载中...
          </div>
        ) : syncData && syncData.length > 0 ? (
          <div className="dev-sync-table-wrapper">
            <table className="dev-sync-table">
              <thead>
                <tr>
                  <th>Space</th>
                  <th>Name</th>
                  <th>Proposals Count</th>
                  <th>Fetched Count</th>
                  <th>Translated Count</th>
                  <th>Translation %</th>
                  <th>Needs Sync</th>
                </tr>
              </thead>
              <tbody>
                {syncData.map((item, index) => (
                  <tr key={index} className={item.needsSync ? 'needs-sync' : 'synced'}>
                    <td className="space-col">
                      <code>{item.space}</code>
                    </td>
                    <td className="name-col">{item.name}</td>
                    <td className="number-col">{item.proposalsCount}</td>
                    <td className="number-col">{item.fetchedProposalsCount}</td>
                    <td className="number-col">{item.translatedProposalsCount}</td>
                    <td className="percentage-col">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${item.translationPercentage}%` }}
                        >
                          {item.translationPercentage}%
                        </div>
                      </div>
                    </td>
                    <td className="status-col">
                      <span className={`status-badge ${item.needsSync ? 'pending' : 'complete'}`}>
                        {item.needsSync ? '⚠️ 需要同步' : '✅ 已同步'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="dev-sync-empty">
            📭 无数据
          </div>
        )}

       
      </div>
    </Layout>
  )
}

export default DevSyncStatusImportantPage
