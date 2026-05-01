import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 赛博莉莉丝. All rights reserved.',
    },
    {
      name: 'icp',
      type: 'text',
      label: 'ICP备案号',
      admin: {
        description: '例如: 京ICP备12345678号',
      },
    },
    {
      name: 'links',
      type: 'array',
      label: '底部链接',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: '链接名称',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: '链接地址',
        },
      ],
    },
    {
      name: 'showPoweredBy',
      type: 'checkbox',
      label: '显示 Powered by Payload',
      defaultValue: true,
    },
  ],
}
