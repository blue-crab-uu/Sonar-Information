const axios = require('axios');
require('dotenv').config();

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  
  const apiUrl = process.env.PROPOSALS_API_URL;
  
  try { 
    const res = await axios.get(apiUrl);
    const groupedData = res.data.data;

    if (!groupedData) {
      console.error("❌ API 返回的数据结构中没有 data 字段");
      return;
    }

    Object.entries(groupedData).forEach(([spaceId, proposals]) => {
      
      if (Array.isArray(proposals)) {
        proposals.forEach((proposal) => {
          const nodeData = {
            ...proposal,
            proposalId: proposal.id,
            spaceName: spaceId,   
            id: createNodeId(`proposal-${proposal.id}`),
            internal: {
              type: 'Proposal',
              contentDigest: createContentDigest(proposal),
            },
          };

          createNode(nodeData);
        });
      }
    });

    console.log(`✅ 成功同步了项目数据`);

  } catch (error) {
    console.error("❌ 抓取失败:", error.message);
  }
};






//   const list = Array.isArray(res.data) ? res.data : res.data.data; // <= 你的数组
// if (!Array.isArray(list))
//     throw new Error(`API 返回不是数组，实际类型：${typeof res.data}`);
//   // 2. 每条记录变成 Gatsby 内部节点
//   list.forEach((item, idx) => {
//     createNode({
//       ...item,
//       id: createNodeId(`currency-${item.id}`),
//       internal: {
//         type: 'Currency',
//         contentDigest: createContentDigest(item),
//       },
//     });
//   });

//   console.log(`✅ 从 API 抓到 ${list.length} 条货币`);
// };