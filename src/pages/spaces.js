import React, { useState, useMemo } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../components/space.css"

const SpacesPage = ({ data }) => {
  const allSpaces = data.allSpaceInfo.nodes
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  
  const itemsPerPage = 21 // 列表视图下，20条/页视觉上更整齐

  const filteredSpaces = useMemo(() => {
    return allSpaces.filter(space => {
      const sName = (space.name || "").toLowerCase()
      const sId = (space.space || "").toLowerCase()
      const search = searchTerm.toLowerCase()
      return sName.includes(search) || sId.includes(search)
    })
  }, [allSpaces, searchTerm])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSpaces = filteredSpaces.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredSpaces.length / itemsPerPage)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  return (
    <Layout>
      <div className="spaces-container">
        <h1 className="page-title">📡 探测到的空间</h1>

        <div className="search-section">
          <input
            type="text"
            className="space-search-input"
            placeholder="搜索空间名称或 ID..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <p className="search-result-count">
              共找到 {filteredSpaces.length} 个结果
            </p>
          )}
        </div>
        
        {/* 这里由 grid 改为 list */}
        <div className="space-list">
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
                <span className="meta-badge">👥 {space.followersCount.toLocaleString()} 关注</span>
                <span className="meta-badge">📊 {space.proposalsCount} 提案</span>
                <span className="meta-badge">🏷️ {space.verified ? "已验证" : "未验证"}</span>
                <span className="meta-badge">✅ {space.votesCount.toLocaleString()} 投票数</span>
                {/* 增加翻译分类显示逻辑 */}
                {space.translateCategories && 
                  (typeof space.translateCategories === 'string' 
                    ? space.translateCategories.trim() !== '' 
                    : Object.keys(space.translateCategories).length > 0) && (
                  <span className="meta-badge">
                    🌐 {Array.isArray(space.translateCategories) 
                      ? space.translateCategories.join('     ') 
                      : space.translateCategories}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filteredSpaces.length === 0 && (
          <div className="no-results">
            🚀 未找到匹配的空间，换个词试试？
          </div>
        )}

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
      name
      proposalsCount
      space
      verified
      votesCount
      translateCategories
      }
    }
  }
`

export const Head = ({ location }) => (
  <Seo
    title="治理空间目录"
    description="按关注度浏览各 DAO 治理空间，查看提案数量、粉丝数与标签。"
    pathname={location?.pathname}
  />
)

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
