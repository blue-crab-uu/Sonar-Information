import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";
import ReactMarkdown from "react-markdown"; // 1. 引入插件
import "../components/proposal.css";

const ProposalDetailTemplate = ({ data }) => {
  const proposal = data.proposal;
  
  if (!proposal) return <div>未找到提案</div>;

  return (
    <Layout>
    <div className="proposal-detail-container">
      <h1 className="detail-title">{proposal.translated_title}</h1>
      
      <span className="proposal-meta">
        <span className="from-label">From</span> 
        <Link className="space-link" to={`/spaces/${proposal.spaceName}`}>
          {proposal.spaceName}
        </Link>
        <a className="space-link original-link" 
           target="_blank" 
           rel="noopener noreferrer" 
           href={`https://snapshot.box/#/s:${proposal.spaceName}/proposal/${proposal.proposalId}`}>
          原文链接
        </a>
      </span>

      <hr className="divider" />
      
      <section className="summary-section">
        <h2>摘要</h2>
        <p className="summary-text">{proposal.short_summary}</p>
      </section>

      <hr className="divider" />

      <section className="content-section">
        <h2>提案内容</h2>
        {/* 2. 使用 ReactMarkdown 渲染内容 */}
        <div className="markdown-body">
          <ReactMarkdown>{proposal.translated_body}</ReactMarkdown>
        </div>
      </section>
    </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    proposal(id: { eq: $id }) {
      short_summary
      translated_body
      translated_title
      spaceName
      proposalId
    }
  }
`

export default ProposalDetailTemplate