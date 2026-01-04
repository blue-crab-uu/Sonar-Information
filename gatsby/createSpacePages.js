const path = require(`path`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

//   查找所有spaceName
  const result = await graphql(`
    query{
    allSpaceInfo(sort: {followersCount: DESC}) {
    nodes {
      space
      id
      followersCount
    }
    }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`❌ 查询提案时出错`, result.errors);
    return;
  }

  const spaces = result.data.allSpaceInfo.nodes;
  const template = path.resolve(`./src/templates/space-detail.js`);

  // 2. 遍历每个提案，创建页面
  spaces.forEach((space) => {
    // 优先使用原始 ID 作为路径，如果没有就用 Gatsby 生成的 ID
    const pathName = space.space;

    createPage({
      // 浏览器访问的路径，例如：/proposal/0x123...
      path: `/spaces/${pathName}`,
      // 使用哪个模板
      component: template,
      // 传递给模板 GraphQL 查询的变量
      context: {
        spaceName: space.space, 
        
      },
    });
  });

  console.log(`✅ 成功创建了 ${spaces.length} 个空间详情页`);
};