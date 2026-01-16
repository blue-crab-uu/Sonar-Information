/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import ogImage from "../images/ogindex.png"

function Seo({
  title,
  description,
  children,
  pathname,
  image,
  lang = "zh-CN",
  article = false,
}) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          twitterUsername
        }
      }
    }
  `)

  const siteMetadata = site?.siteMetadata || {}
  const metaDescription = description || siteMetadata.description || ""
  const defaultTitle = siteMetadata.title

  const buildAbsoluteUrl = (value) => {
    if (!value) return null
    if (/^https?:\/\//i.test(value)) return value
    const base = siteMetadata.siteUrl
    if (!base) return value
    try {
      return new URL(value.startsWith("/") ? value : `/${value}`, base).toString()
    } catch (error) {
      return value
    }
  }

  const canonicalUrl = buildAbsoluteUrl(pathname)
  const imageUrl = buildAbsoluteUrl(image || ogImage)

  return (
    <>
      <html lang={lang} />
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index,follow" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={article ? "article" : "website"} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {siteMetadata.title && <meta property="og:site_name" content={siteMetadata.title} />}
      <meta property="og:locale" content="zh_CN" />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <meta name="twitter:card" content={imageUrl ? "summary_large_image" : "summary"} />
      {siteMetadata.twitterUsername && <meta name="twitter:site" content={siteMetadata.twitterUsername} />}
      <meta name="twitter:creator" content={siteMetadata.twitterUsername || siteMetadata.author || ""} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {children}
    </>
  )
}

export default Seo
