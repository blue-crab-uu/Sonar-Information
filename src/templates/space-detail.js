import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import "../components/space-detail.css" // 🚩 引入新的 CSS
import Seo from "../components/seo"

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
          <h1>{spaceInfo.name || spaceInfo.space} Space</h1>
          <div className="space-stats-bar">
            <div className="stat-item">
              📊 提案总数: <strong>{spaceInfo.proposalsCount?.toLocaleString?.() ?? spaceInfo.proposalsCount}</strong>
            </div>
            <div className="stat-item">
              👥 关注人数: <strong>{spaceInfo.followersCount?.toLocaleString?.() ?? spaceInfo.followersCount}</strong>
            </div>
            <div className="stat-item">
              🏷️ 分类标签: <strong>{Array.isArray(spaceInfo.translateCategories) ? spaceInfo.translateCategories.filter(Boolean).join(" • ") || "无" : spaceInfo.translateCategories || "无"}</strong>
            </div>
            <div className="stat-item">
              ✅ 投票总数: <strong>{spaceInfo.votesCount?.toLocaleString?.() ?? spaceInfo.votesCount}</strong>
            </div>
            {(spaceInfo.twitter || spaceInfo.github || spaceInfo.coingecko) && (
              <div className="external-links">
                {spaceInfo.twitter && (
                  <a
                    className="external-link"
                    href={`https://x.com/${spaceInfo.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on X"
                  >
                    <svg
                      className="external-link__icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M4.5 3h4.2l3 4.3L14.7 3H21l-6.2 7.2L21 21h-4.2l-3.4-4.7L9.5 21H3l6.6-7.6L3 3h1.5Zm2.4 1.6L11 9.9l.3.4L5.7 19h3l3.7-4.9 3.5 4.9h2.7l-5.8-8 5.6-6.8h-2.9l-3.2 4.2-3-4.2H6.9Z" />
                    </svg>
                  </a>
                )}
                {spaceInfo.github && (
                  <a
                    className="external-link"
                    href={`https://github.com/${spaceInfo.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on GitHub"
                  >
                    <svg
                      className="external-link__icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2c-5.5 0-10 4.5-10 10 0 4.4 2.9 8.1 6.9 9.4.5.1.6-.2.6-.4v-1.6c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.7-1.3-2.2-.3-4.4-1.1-4.4-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.2 2.8 1 .8-.2 1.6-.3 2.4-.3.8 0 1.6.1 2.4.3 2-1.3 2.8-1 2.8-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7.9.7 1.8v2.7c0 .2.1.5.6.4 4-1.3 6.9-5 6.9-9.4C22 6.5 17.5 2 12 2Z" />
                    </svg>
                  </a>
                )}
                {spaceInfo.coingecko && (
                  <a
                    className="external-link"
                    href={`https://www.coingecko.com/en/coins/${spaceInfo.coingecko}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on CoinGecko"
                  >
                    <svg
                      className="external-link__icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2.5c5.2 0 9.5 4.3 9.5 9.5S17.2 21.5 12 21.5 2.5 17.2 2.5 12 6.8 2.5 12 2.5Zm0 1.6A7.9 7.9 0 0 0 4.1 12c0 4.4 3.5 7.9 7.9 7.9 3.7 0 6.8-2.5 7.7-5.9-1.1.5-2.2.5-3.3.1-1.2-.5-2-1.5-2.6-2.7-.5-.9-1.1-1.5-2.1-1.6-1-.2-2 .2-2.7 1-.8 1-2.1 1.1-2.8.2-.7-.9-.4-2.1.5-2.7 1.2-.8 2.7-1.2 4.3-.9 1.5.3 2.6 1.1 3.4 2.4.5 1 1.1 1.7 2 2 .8.3 1.6.2 2.5-.3.1-.4.1-.8.1-1.2 0-4.4-3.5-7.9-7.9-7.9Z" />
                    </svg>
                  </a>
                )}
              </div>
            )}

            
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
                key={proposal.proposalId} 
                to={`/${proposal.space}/${proposal.proposalId}`} 
                className="proposal-card-link"
              >
                <div className="proposal-title-row">
                  <span className="proposal-index">
                    {String(indexOfFirstItem + index + 1).padStart(2, '0')}
                  </span>
                  {proposal.translated_title}
                </div>
                
                <div className="proposal-meta-row">
                  From <span className="badge-space">{spaceInfo.name}</span>
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
  query($spaceId: String!) {
    spaceInfo(space: { eq: $spaceId }) {
      space
      followersCount
      id
      proposalsCount
      name  
      translateCategories
      votesCount
      coingecko
      twitter
      github
    }
    allProposal(filter: {space: {eq: $spaceId}}, sort: {created: DESC}) {
      nodes {
        translated_title
        space
        proposalId
        created
      }
    }
  }
`

export const Head = ({ data, location }) => {
  const space = data?.spaceInfo
  const title = space?.name ? `${space.name} Space 提案` : "Space 提案"
  const description = space
    ? `${space.name || space.space} 的治理提案、分类标签与关注数据`
    : "查看空间治理提案详情"

  return (
    <Seo
      title={title}
      description={description}
      pathname={location?.pathname}
    />
  )
}
export default SpaceDetailTemplate