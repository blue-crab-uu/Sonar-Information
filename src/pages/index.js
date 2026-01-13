import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import * as styles from "../components/index.module.css"

const IndexPage = ({ data }) => {
  const allProposals = data.allProposal.nodes
  
  // --- 状态管理 ---
  const [currentPage, setCurrentPage] = useState(1)
  const [activeSort, setActiveSort] = useState("latest") // 默认为“最新”
  const [jumpPage, setJumpPage] = useState("") // 跳转页码输入

  const itemsPerPage = 20
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProposals = allProposals.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(allProposals.length / itemsPerPage)

  return (
    <Layout>
      {/* --- Hero Section --- */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Explore DAO Proposals</h1>
        <p className={styles.heroSubtitle}>
          Discover, track, and analyze the latest governance proposals across the decentralized ecosystem.
        </p>
      </section>

      {/* --- 新增导航栏 --- */}
      <nav className={styles.topNav}>
        <button 
          className={`${styles.navItem} ${activeSort === "latest" ? styles.activeNav : ""}`}
          onClick={() => setActiveSort("latest")}
        >
          最新发布
        </button>
        {/* 这里未来可以增加其他按钮，如：<button className={styles.navItem}>热门</button> */}
      </nav>

      <div className={styles.listContainer}>
        {currentProposals.map((proposal, index) => (
          <Link 
            key={proposal.id} 
            to={`/${proposal.space}/${proposal.proposalId}`} 
            className={styles.proposalCard}
          >
            <span className={styles.proposalTitle}>
              <span style={{ color: "#828282", marginRight: "8px", fontSize: "0.9rem" }}>
                {indexOfFirstItem + index + 1}.
              </span>
              {proposal.translated_title}
            </span>
            
            <div className={styles.proposalMeta}>
              From <span className={styles.spaceBadge}>{proposal.space_name}</span>
              <span className={styles.spaceBadge}>
                创建于: {new Date(proposal.created * 1000).toLocaleDateString()}
              </span> 
              <span className={styles.spaceBadge}>{proposal.translate_categories}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* --- 分页导航条 (保持不变) --- */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            className={styles.pageBtn}
            onClick={() => {
              setCurrentPage(1)
              window.scrollTo(0, 0)
            }}
            disabled={currentPage === 1}
          >
            首页
          </button>

          <button 
            className={styles.pageBtn}
            onClick={() => {
              setCurrentPage(prev => Math.max(prev - 1, 1))
              window.scrollTo(0, 0)
            }}
            disabled={currentPage === 1}
          >
            上一页
          </button>

          <span className={styles.pageInfo}>
            第 {currentPage} 页 / 共 {totalPages} 页
          </span>

          <button 
            className={styles.pageBtn}
            onClick={() => {
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
              window.scrollTo(0, 0)
            }}
            disabled={currentPage === totalPages}
          >
            下一页
          </button>

          <div className={styles.jumpContainer}>
            <input 
              type="number"
              min="1"
              max={totalPages}
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              placeholder="页码"
              className={styles.pageInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const p = parseInt(jumpPage)
                  if (p >= 1 && p <= totalPages) {
                    setCurrentPage(p)
                    window.scrollTo(0, 0)
                    setJumpPage("")
                  }
                }
              }}
            />
            <button 
              className={styles.pageBtn}
              onClick={() => {
                const p = parseInt(jumpPage)
                if (p >= 1 && p <= totalPages) {
                  setCurrentPage(p)
                  window.scrollTo(0, 0)
                  setJumpPage("")
                }
              }}
            >
              跳转
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    allProposal(sort: {created: DESC}) {
      nodes {
      translated_title
      created
      space
      space_name
      proposalId
      translate_categories
      }
    }
  }
`

export default IndexPage