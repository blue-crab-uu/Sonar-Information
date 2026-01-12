import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";
import ReactMarkdown from "react-markdown"; // 1. 引入插件
import remarkGfm from 'remark-gfm';
import "../components/proposal.css";
import remarkBreaks from 'remark-breaks';

const ProposalDetailTemplate = ({ data }) => {
  const proposal = data.proposal;
  const created = new Date(proposal.created * 1000);
  if (!proposal) return <Layout>未找到提案</Layout>;
  
// --- 核心修改：定义 Snapshot 官方网关 ---
  const SNAPSHOT_GATEWAY = 'https://ipfs.snapshot.box/ipfs/';


  return (
    <Layout>
    <div className="proposal-detail-container">
      <h1 className="detail-title">{proposal.translated_title}</h1>
      
      <span className="proposal-meta">
        <span className="from-label">From</span> 
        <Link className="space-link" to={`/spaces/${proposal.space}`}>
          {proposal.space_name }
        </Link>
        <a className="space-link original-link" 
           target="_blank" 
           rel="noopener noreferrer" 
          //  href={`https://snapshot.box/#/s:${proposal.spaceName}/proposal/${proposal.proposalId}`}
          href={proposal.link}
           >
          原文链接
        </a>
            {proposal.discussion && (
          <a className="space-link discussion-link" 
              target="_blank" 
              rel="noopener noreferrer" 
              href={proposal.discussion}
            >
            💬 参与讨论
           </a>
               )}
        <span className="created-date">创建于: {created.toLocaleDateString()}</span>
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
  <ReactMarkdown 
    remarkPlugins={[remarkGfm, remarkBreaks]}
    // 新版本请使用 urlTransform
    urlTransform={(uri) => 
  uri.startsWith('ipfs://') 
    ? uri.replace('ipfs://', SNAPSHOT_GATEWAY) 
    : uri
}
  >
    {/* 2. 传入前对全文进行一次字符串替换，确保所有 ipfs:// 都能转成正确的 https 地址 */}
            {proposal.translated_body?.replace(/ipfs:\/\//g, SNAPSHOT_GATEWAY)}
  </ReactMarkdown>
</div>
      </section>


    </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    proposal(proposalId: { eq: $id }) {
      short_summary
      translated_body
      translated_title
      space
      space_name
      proposalId
      created
      link
      discussion
    }
  }
`

export default ProposalDetailTemplate