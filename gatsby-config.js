/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `声呐信息 | Sonar Information`,
    description: `深耕 DAO 治理，探测全球治理提案，提供精准的中文翻译与摘要。`,
    author: `@SonarInfo`,
    siteUrl: `https://your-domain.com`, // 替换为你的域名
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GA_TRACKING_ID, 
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    
  ],
}
