/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
// 1. 定义 Schema 关联逻辑
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  
  const typeDefs = `
    type Proposal implements Node {
      # 原始字段
      spaceName: String
      translated_title: String
      
      # 🚀 建立联合字段：通过自己的 spaceName 关联到 SpaceInfo 节点的 space 字段
      spaceDetails: SpaceInfo @link(by: "space", from: "spaceName")
    }

    type SpaceInfo implements Node {
      # 关联键字段
      space: String
      name: String
      id: ID!
      
      # 🚀 反向关联（可选）：获取该 Space 下的所有提案
      proposals: [Proposal] @link(by: "spaceName", from: "space")
    }
  `;
  
  createTypes(typeDefs);
};



exports.sourceNodes = async (...args) => {
  await require('./gatsby/sourceProposals.js').sourceNodes(...args);
  await require('./gatsby/sourceSpaceName.js').sourceNodes(...args);
};

exports.createPages = async (...args) => {
  await require('./gatsby/createProposalPages.js').createPages(...args);
  await require('./gatsby/createSpacePages.js').createPages(...args);
};
