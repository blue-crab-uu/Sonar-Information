import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import "../components/space-detail.css" // 复用你已经写好的样式

const SearchPage = ({ data }) => {
  const allProposals = data.allProposal.nodes
  const [searchQuery, setSearchQuery] = useState("")

  // 核心搜索逻辑：过滤标题或所属空间名
  const filteredProposals = allProposals.filter(proposal => {
    const title = proposal.translated_title?.toLowerCase() || ""
    const space = proposal.spaceName?.toLowerCase() || ""
    const query = searchQuery.toLowerCase()
    return title.includes(query) || space.includes(query)
  })

  return (
    <Layout>
      <div className="detail-container">
        <header className="space-header-section">
          <h1>🔍 搜索提案</h1>
          <div style={{ marginTop: "1rem" }}>
            <input
              type="text"
              placeholder="输入关键词，搜索翻译后的提案标题或空间名..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 20px",
                borderRadius: "12px",
                border: "2px solid #0071e3",
                fontSize: "1.1rem",
                outline: "none",
                boxShadow: "0 4px 10px rgba(0,113,227,0.1)"
              }}
            />
          </div>
          <p style={{ color: "#666", marginTop: "10px" }}>
            {searchQuery ? `找到 ${filteredProposals.length} 个相关结果` : `共载入 ${allProposals.length} 个待命提案`}
          </p>
        </header>

        <div className="proposal-list-wrapper">
          {filteredProposals.length > 0 ? (
            filteredProposals.slice(0, 50).map((proposal, index) => (
              <Link 
                key={proposal.id} 
                to={`/${proposal.spaceName}/${proposal.id}`} 
                className="proposal-card-link"
              >
                <div className="proposal-title-row">
                  <span className="proposal-index">{(index + 1).toString().padStart(2, '0')}</span>
                  {proposal.translated_title}
                </div>
                <div className="proposal-meta-row">
                  From <span className="badge-space">{proposal.spaceName}</span>
                  <span>📅 {new Date(proposal.created * 1000).toLocaleDateString()}</span>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "3rem", color: "#999" }}>
              🚀 暂无搜索结果，尝试换个词看看？
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allProposal(sort: {created: DESC}) {
      nodes {
        id
        translated_title
        spaceName
        created
      }
    }
  }
`

export default SearchPage