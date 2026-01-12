const path = require(`path`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // 1. 查询所有提案的 ID
  const result = await graphql(`
    query {
      allProposal {
        nodes {
          proposalId
          space
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`❌ 查询提案时出错`, result.errors);
    return;
  }

  const proposals = result.data.allProposal.nodes;
  const template = path.resolve(`./src/templates/proposal-detail.js`);

  // 2. 遍历每个提案，创建页面
  proposals.forEach((proposal) => {
    // 优先使用原始 ID 作为路径，如果没有就用 Gatsby 生成的 ID
    const pathId =  proposal.proposalId;
    const pathName = proposal.space;

    createPage({
      // 浏览器访问的路径，例如：/stgdao.eth/0x123...
      path: `/${pathName}/${pathId}`,
      // 使用哪个模板
      component: template,
      // 传递给模板 GraphQL 查询的变量
      context: {
        id: proposal.proposalId, // 这个 id 会传给模板里的 $id 变量
        
      },
    });
  });

  console.log(`✅ 成功创建了 ${proposals.length} 个提案详情页`);
};