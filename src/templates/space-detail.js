import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import "../components/space-detail.css" // 🚩 引入新的 CSS

const SpaceDetailTemplate = ({ data }) => {
  const spaceInfo = data.spaceInfo;
  const proposals = data.allProposal.nodes;

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProposals = proposals.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(proposals.length / itemsPerPage)

  return (
    <Layout>
      <div className="detail-container">
        
        {/* --- 空间信息头部 --- */}
        <header className="space-header-section">
          <h1>{spaceInfo.name || spaceInfo.space} 空间站</h1>
          <div className="space-stats-bar">
            <div className="stat-item">
              📊 提案总数: <strong>{spaceInfo.proposalsCount}</strong>
            </div>
            <div className="stat-item">
              👥 关注人数: <strong>{spaceInfo.followersCount}</strong>
            </div>
          </div>
        </header>

        {/* --- 提案列表 --- */}
        <div className="proposal-list-wrapper">
          {currentProposals.map((proposal, index) => {
            // 在循环内部处理日期显示
            const dateStr = new Date(proposal.created * 1000).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });

            return (
              <Link 
                key={proposal.id} 
                to={`/${proposal.spaceName}/${proposal.id}`} 
                className="proposal-card-link"
              >
                <div className="proposal-title-row">
                  <span className="proposal-index">
                    {String(indexOfFirstItem + index + 1).padStart(2, '0')}
                  </span>
                  {proposal.translated_title}
                </div>
                
                <div className="proposal-meta-row">
                  From <span className="badge-space">{proposal.spaceName}</span>
                  <span className="time-stamp">📅 创建于: {dateStr}</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* --- 分页导航 --- */}
        {totalPages > 1 && (
          <nav className="pagination-nav">
            <button 
              className="nav-btn"
              onClick={() => {
                setCurrentPage(prev => Math.max(prev - 1, 1))
                window.scrollTo(0, 0)
              }}
              disabled={currentPage === 1}
            >
              上一页
            </button>

            <span className="page-indicator">
              第 {currentPage} / {totalPages} 页
            </span>

            <button 
              className="nav-btn"
              onClick={() => {
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
                window.scrollTo(0, 0)
              }}
              disabled={currentPage === totalPages}
            >
              下一页
            </button>
          </nav>
        )}
      </div>
    </Layout>
  )
}


export const query = graphql`
  query($spaceName: String!) {
    spaceInfo(space: { eq: $spaceName }) {
      space
      followersCount
      id
      proposalsCount
      name
    }
    allProposal(filter: {spaceName: {eq: $spaceName}}) {
    nodes {
      translated_title
      spaceName
      id
      created
    }
  }
  }
`
export default SpaceDetailTemplate