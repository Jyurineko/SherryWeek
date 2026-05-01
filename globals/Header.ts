import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: '网站 Logo',
      },
    },
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
      defaultValue: '赛博莉莉丝',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: '探索技术，分享生活',
    },
    {
      name: 'navItems',
      type: 'array',
      label: '导航菜单',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: '菜单名称',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: '链接地址',
          admin: {
            description: '例如: /about, /posts, https://example.com',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: '新窗口打开',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: '社交媒体链接',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'GitHub', value: 'github' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: '微信', value: 'wechat' },
            { label: '微博', value: 'weibo' },
            { label: '知乎', value: 'zhihu' },
            { label: '其他', value: 'other' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: '链接地址',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: '自定义图标',
        },
      ],
    },
  ],
}
