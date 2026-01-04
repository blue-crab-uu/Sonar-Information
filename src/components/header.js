import React from "react"
import { Link } from "gatsby"
import "./header.css"

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-content">
        {/* 左侧标题 */}
        <div className="header-logo-wrapper">
          <Link to="/" className="brand-link">
            {/* 这里是新加的声呐图标结构 */}
            <div className="sonar-icon">
              <div className="sonar-dot"></div>
              <div className="sonar-wave"></div>
              <div className="sonar-wave sonar-wave-delayed"></div>
            </div>
            {/* 你的新名字 */}
            <span className="brand-text">声呐信息 Sonar Information</span>
          </Link>
        </div>

        {/* 右侧导航按钮 */}
        <nav className="header-nav">
          <Link className="nav-btn" activeClassName="active" to="/">
            首页
          </Link>
          <Link className="nav-btn" activeClassName="active" to="/search">
            搜索
          </Link>
          <Link className="nav-btn" activeClassName="active" to="/spaces">
            Spaces
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header