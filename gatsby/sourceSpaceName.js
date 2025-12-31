const axios = require('axios');
require('dotenv').config();

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  
  const apiUrl = process.env.SPACENAME_API_URL;
  
  try { 
    const res = await axios.get(apiUrl);
    const list = res.data.data;

    if (!list) {
      console.error("❌ API 返回的数据结构中没有 data 字段");
      return;
    }

    list.forEach((space) => {
      const nodeData = {
        ...space,
        id: createNodeId(`space-info-${space.space}`),
        internal: {
          type: 'SpaceInfo',
          contentDigest: createContentDigest(space),
        },
      };

      createNode(nodeData);
    });

    console.log(`✅ 成功同步了项目数据`);

  } catch (error) {
    console.error("❌ 抓取失败:", error.message);
  }
};