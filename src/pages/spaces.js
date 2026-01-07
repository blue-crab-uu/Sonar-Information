import React, { useState, useMemo } from "react" // 引入 useMemo 优化性能
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import "../components/space.css"

const SpacesPage = ({ data }) => {
  const allSpaces = data.allSpaceInfo.nodes
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("") // 🔍 1. 增加搜索状态
  
  const itemsPerPage = 21

  // 🔍 2. 根据搜索词过滤数据
  const filteredSpaces = useMemo(() => {
    return allSpaces.filter(space => {
      const sName = (space.name || "").toLowerCase()
      const sId = (space.space || "").toLowerCase()
      const search = searchTerm.toLowerCase()
      return sName.includes(search) || sId.includes(search)
    })
  }, [allSpaces, searchTerm])

  // 🔍 3. 搜索后重新计算分页
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSpaces = filteredSpaces.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredSpaces.length / itemsPerPage)

  // 处理搜索输入变更
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // 🔍 搜索时重置回第一页
  }

  return (
    <Layout>
      <div className="spaces-container">
        <h1 className="page-title">📡 探测到的空间</h1>

        {/* 🔍 4. 增加搜索框 UI */}
        <div className="search-section">
          <input
            type="text"
            className="space-search-input"
            placeholder="搜索空间名称"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <p className="search-result-count">
              共找到 {filteredSpaces.length} 个结果
            </p>
          )}
        </div>
        
        <div className="space-grid">
          {currentSpaces.map((space, index) => (
            <Link 
              key={space.id} 
              to={`/spaces/${space.space}`} 
              className="space-card"
            >
              <div className="space-header">
                <span className="space-index">
                  {String(indexOfFirstItem + index + 1).padStart(2, '0')}
                </span>
                <span className="space-name">{space.name || space.space}</span>
              </div>
              
              <div className="space-meta">
                <span className="meta-badge">👥 关注 {space.followersCount}</span>
                <span className="meta-badge">📊 提案 {space.proposalsCount}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* 无结果时的提示 */}
        {filteredSpaces.length === 0 && (
          <div className="no-results">
            🚀 未找到匹配的空间，换个词试试？
          </div>
        )}

        {/* --- 分页导航条 --- */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="page-btn"
              onClick={() => {
                setCurrentPage(prev => Math.max(prev - 1, 1))
                window.scrollTo(0, 0)
              }}
              disabled={currentPage === 1}
            >
              ← 上一页
            </button>

            <span className="page-info">
              第 {currentPage} / {totalPages} 页
            </span>

            <button 
              className="page-btn"
              onClick={() => {
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
                window.scrollTo(0, 0)
              }}
              disabled={currentPage === totalPages}
            >
              下一页 →
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allSpaceInfo(sort: {followersCount: DESC}) {
      nodes {
        followersCount
        id
        proposalsCount
        space
        name
      }
    }
  }
`

export default SpacesPage



// import React, { useState } from "react"
// import { graphql, Link } from "gatsby"
// import Layout from "../components/layout"
// import * as styles from "../components/index.module.css" // 导入 CSS Module

// const SpacesPage = ({ data }) => {
//   const allSpaces = data.allSpaceInfo.nodes
  
//   // --- 分页逻辑 ---
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 20
  
//   // 计算当前页应该显示的数据
//   const indexOfLastItem = currentPage * itemsPerPage
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage
//   const currentSpaces = allSpaces.slice(indexOfFirstItem, indexOfLastItem)
  
//   // 总页数
//   const totalPages = Math.ceil(allSpaces.length / itemsPerPage)

//   return (
//     <Layout>
//       <div className={styles.listContainer}>
//         {currentSpaces.map((space, index) => (
          
//           <Link 
//             key={space.id} 
//             to={`/spaces/${space.space}`} 
//             className={styles.proposalCard}
//           >
//             <span className={styles.proposalTitle}>
//               <span style={{ color: "#828282", marginRight: "8px", fontSize: "0.9rem" }}>
//                 {indexOfFirstItem + index + 1}.
//               </span>
//               {space.name}
//             </span>
            
//             <div className={styles.proposalMeta}>
//               👥关注总数: <span className={styles.spaceBadge}>{space.followersCount}</span>
//               📊提案总数: <span className={styles.spaceBadge}>{space.proposalsCount}</span>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* --- 分页导航条 --- */}
//       {totalPages > 1 && (
//         <div className={styles.pagination}>
//           <button 
//             className={styles.pageBtn}
//             onClick={() => {
//               setCurrentPage(prev => Math.max(prev - 1, 1))
//               window.scrollTo(0, 0) // 翻页后回到顶部
//             }}
//             disabled={currentPage === 1}
//           >
//             上一页
//           </button>

//           <span className={styles.pageInfo}>
//             第 {currentPage} 页 / 共 {totalPages} 页
//           </span>

//           <button 
//             className={styles.pageBtn}
//             onClick={() => {
//               setCurrentPage(prev => Math.min(prev + 1, totalPages))
//               window.scrollTo(0, 0)
//             }}
//             disabled={currentPage === totalPages}
//           >
//             下一页
//           </button>
//         </div>
//       )}
//     </Layout>
//   )
// }

// export const query = graphql`
//   query MyQuery {
//   allSpaceInfo(sort: {followersCount: DESC}) {
//     nodes {
//       followersCount
//       id
//       proposalsCount
//       space
//       name
//     }
//   }
// }`

// export default SpacesPage
