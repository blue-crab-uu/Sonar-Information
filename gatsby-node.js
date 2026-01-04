/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

exports.sourceNodes = async (...args) => {
  await require('./gatsby/sourceProposals.js').sourceNodes(...args);
  await require('./gatsby/sourceSpaceName.js').sourceNodes(...args);
};

exports.createPages = async (...args) => {
  await require('./gatsby/createProposalPages.js').createPages(...args);
  await require('./gatsby/createSpacePages.js').createPages(...args);
};
