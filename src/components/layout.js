import React from "react"
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <div className="page-container">
      {/* 1. 顶部固定导航 */}
      <Header />

      {/* 2. 中央内容卡片 */}
      <div className="main-content">
        <main className="main-body">
          {children}
        </main>
        
        {/* 3. 放在卡片底部的页脚 */}
        <footer className="footer">
          <p className="footer-slogan">声纳信息 © 2025</p>
          <p className="footer-info">Sonar Information ❤️ </p>
        </footer>
      </div>
    </div>
  )
}

export default Layout

