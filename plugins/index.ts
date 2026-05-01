import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import type { Plugin } from 'payload'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

const generateTitle: GenerateTitle = ({ doc }) => {
  return doc?.title ? `${doc.title} | 赛博莉莉丝` : '赛博莉莉丝'
}

const generateURL: GenerateURL = ({ doc }) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'https://cyberlilith.com'
  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  // SEO 插件
  seoPlugin({
    generateTitle,
    generateURL,
  }),

  // 搜索插件
  searchPlugin({
    collections: ['posts', 'pages'],
    defaultPriorities: {
      posts: 10,
      pages: 5,
    },
  }),

  // 重定向插件
  redirectsPlugin({
    collections: ['pages', 'posts'],
  }),

  // 表单构建器
  formBuilderPlugin({
    fields: {
      text: true,
      textarea: true,
      select: true,
      email: true,
      checkbox: true,
      number: true,
      message: true,
      payment: false,
    },
  }),

  // 嵌套文档（分类层级）
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
]
