import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout";

// 注意：必须使用 export default
const ProposalDetailTemplate = ({ data }) => {
  const proposal = data.proposal;
  
  if (!proposal) return <div>未找到提案</div>;

  return (
    <Layout>
    <div style={{ padding: "2rem" }}>
      <h1>{proposal.translated_title}</h1>
      <span>From {proposal.spaceName}</span>
      <hr />
      <h2>摘要</h2>
      <p>{proposal.short_summary}</p>
      <hr />
      <h2>提案内容</h2>
      <div style={{ whiteSpace: "pre-wrap" }}>{proposal.translated_body}</div>
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
    }
  }
`

export default ProposalDetailTemplate 