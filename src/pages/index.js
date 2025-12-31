import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import * as styles from "../components/index.module.css" // 导入 CSS Module

const IndexPage = ({ data }) => {
  const allProposals = data.allProposal.nodes
  
  // --- 分页逻辑 ---
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  
  // 计算当前页应该显示的数据
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProposals = allProposals.slice(indexOfFirstItem, indexOfLastItem)
  
  // 总页数
  const totalPages = Math.ceil(allProposals.length / itemsPerPage)

  return (
    <Layout>
      <div className={styles.listContainer}>
        {currentProposals.map((proposal, index) => (
          
          <Link 
            key={proposal.id} 
            to={`/${proposal.spaceName}/${proposal.id}`} 
            className={styles.proposalCard}
          >
            <span className={styles.proposalTitle}>
              <span style={{ color: "#828282", marginRight: "8px", fontSize: "0.9rem" }}>
                {indexOfFirstItem + index + 1}.
              </span>
              {proposal.translated_title}
            </span>
            
            <div className={styles.proposalMeta}>
              来自 <span className={styles.spaceBadge}>{proposal.spaceName}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* --- 分页导航条 --- */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            className={styles.pageBtn}
            onClick={() => {
              setCurrentPage(prev => Math.max(prev - 1, 1))
              window.scrollTo(0, 0) // 翻页后回到顶部
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
      id
      spaceName
    }
  }
  }
`

export default IndexPage