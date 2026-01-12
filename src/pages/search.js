import React, { useState, useMemo } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import "../components/space-detail.css"
// 导入主页的 CSS Module 来复用导航栏样式，确保 UI 统一
import * as navStyles from "../components/index.module.css" 

const SearchPage = ({ data }) => {
  const allProposals = data.allProposal.nodes
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSort, setActiveSort] = useState("latest") // 默认选中最新

  const filteredProposals = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return allProposals

    return allProposals.filter((proposal) => {
      const title = (proposal.translated_title || "").toLowerCase()
      const space = (proposal.space || "").toLowerCase()
      return title.includes(query) || space.includes(query)
    })
  }, [allProposals, searchQuery])

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

        {/* --- 新增：与主页一致的导航栏 --- */}
        <nav className={navStyles.topNav} style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
          <button 
            className={`${navStyles.navItem} ${activeSort === "latest" ? navStyles.activeNav : ""}`}
            onClick={() => setActiveSort("latest")}
          >
            最新发布
          </button>
          {/* 预留位置：未来可以增加“相关度排序”按钮 */}
        </nav>

        <div className="proposal-list-wrapper">
            {filteredProposals.length > 0 ? (
            filteredProposals.slice(0, 50).map((proposal, index) => (
              <Link 
                key={proposal.id} 
                to={`/${proposal.space}/${proposal.proposalId}`} 
                className="proposal-card-link"
              >
                <div className="proposal-title-row">
                  <span className="proposal-index">{(index + 1).toString().padStart(2, '0')}</span>
                  {proposal.translated_title}
                </div>
                <div className="proposal-meta-row">
                  From <span className="badge-space">{proposal.space}</span>
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
        space
        proposalId
        created
      }
    }
  }
`

export default SearchPage