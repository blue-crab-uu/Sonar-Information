import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import * as styles from "../components/index.module.css" // 导入 CSS Module

const SpaceDetailTemplate = ({ data }) => {
const spaceInfo = data.spaceInfo;
const proposals = data.allProposal.nodes;

const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  
  // 计算当前页应该显示的数据
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProposals = proposals.slice(indexOfFirstItem, indexOfLastItem)
  
  // 总页数
  const totalPages = Math.ceil(proposals.length / itemsPerPage)

  return (
    <Layout>

    {/* --- 新增：空间信息头部 --- */}
    <div style={{ 
    padding: "0.5rem 2rem 0", // 👈 将 2rem 改为 0.5rem，垂直方向立刻收紧
    maxWidth: "1400px", 
    margin: "0 auto",
    marginTop: "-1rem"       // 👈 如果还是觉得低，可以加一个负边距向上拉
    }}>
    <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem", marginTop: "0" }}> 
    {/* 🚩 注意：给 h1 也加上 marginTop: 0，防止浏览器自带的标题间距占位 */}
    {spaceInfo.space} 空间站
    </h1>
    <div style={{ color: "#666", fontSize: "0.9rem", display: "flex", gap: "15px" }}>
    <span>📊 提案总数: <strong>{spaceInfo.proposalsCount}</strong></span>
    <span>👥 关注人数: <strong>{spaceInfo.followersCount}</strong></span>
    </div>
    </div>

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
              From <span className={styles.spaceBadge}>{proposal.spaceName}</span>
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
  query($spaceName: String!) {
    spaceInfo(space: { eq: $spaceName }) {
      space
      followersCount
      id
      proposalsCount
    }
    allProposal(filter: {spaceName: {eq: $spaceName}}) {
    nodes {
      translated_title
      spaceName
      id
    }
  }
  }
`
export default SpaceDetailTemplate