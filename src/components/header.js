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
            <div className="logo-wrapper">
              <svg className="logo-svg" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="6" fill="url(#paint0_linear)" />
                <path d="M18 6C24.6274 6 30 11.3726 30 18C30 24.6274 24.6274 30 18 30" stroke="url(#paint1_linear)" strokeWidth="3" strokeLinecap="round" />
                <path d="M18 2C26.8366 2 34 9.16344 34 18C34 26.8366 26.8366 34 18 34" stroke="url(#paint2_linear)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                <defs>
                  <linearGradient id="paint0_linear" x1="12" y1="12" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3B82F6"/>
                    <stop offset="1" stopColor="#2563EB"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="18" y1="6" x2="18" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3B82F6"/>
                    <stop offset="1" stopColor="#60A5FA"/>
                  </linearGradient>
                  <linearGradient id="paint2_linear" x1="18" y1="2" x2="18" y2="34" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3B82F6"/>
                    <stop offset="1" stopColor="#93C5FD"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="brand-text-col">
              <span className="brand-title">Sonar Info</span>
              <span className="brand-subtitle">声呐信息</span>
            </div>
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
            空间
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header