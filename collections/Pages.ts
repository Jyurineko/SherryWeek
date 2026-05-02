import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: '页面',
    plural: '页面',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: '内容管理',
  },
  defaultSort: '-createdAt',
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '内容',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                description: 'URL 路径，例如: about, contact',
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              admin: {
                description: '页面摘要，用于 SEO 和列表展示',
              },
            },
            {
              name: 'content',
              type: 'richText',
            },
          ],
        },
        {
          label: '页面布局',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: '布局区块',
              blocks: [
                {
                  slug: 'hero',
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                      required: true,
                      label: '主标题',
                    },
                    {
                      name: 'subheading',
                      type: 'textarea',
                      label: '副标题',
                    },
                    {
                      name: 'backgroundImage',
                      type: 'upload',
                      relationTo: 'media',
                      label: '背景图',
                    },
                    {
                      name: 'cta',
                      type: 'group',
                      label: '行动号召按钮',
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          label: '按钮文字',
                        },
                        {
                          name: 'link',
                          type: 'text',
                          label: '按钮链接',
                        },
                      ],
                    },
                  ],
                },
                {
                  slug: 'richText',
                  fields: [
                    {
                      name: 'body',
                      type: 'richText',
                      required: true,
                      label: '正文',
                    },
                  ],
                },
                {
                  slug: 'cardGrid',
                  fields: [
                    {
                      name: 'cards',
                      type: 'array',
                      label: '卡片列表',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          required: true,
                          label: '卡片标题',
                        },
                        {
                          name: 'description',
                          type: 'textarea',
                          label: '卡片描述',
                        },
                        {
                          name: 'image',
                          type: 'upload',
                          relationTo: 'media',
                          label: '卡片图片',
                        },
                        {
                          name: 'link',
                          type: 'text',
                          label: '卡片链接',
                        },
                      ],
                    },
                  ],
                },
                {
                  slug: 'imageGallery',
                  fields: [
                    {
                      name: 'images',
                      type: 'array',
                      label: '图片列表',
                      fields: [
                        {
                          name: 'image',
                          type: 'upload',
                          relationTo: 'media',
                          required: true,
                          label: '图片',
                        },
                        {
                          name: 'caption',
                          type: 'text',
                          label: '图片说明',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  admin: {
                    description: 'SEO 标题',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'SEO 描述',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'SEO 分享图片',
                  },
                },
              ],
            },
          ],
        },
        {
          label: '发布',
          fields: [
            {
              name: 'status',
              type: 'select',
              options: [
                { label: '草稿', value: 'draft' },
                { label: '已发布', value: 'published' },
              ],
              defaultValue: 'draft',
              required: true,
            },
            {
              name: 'publishedAt',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
                position: 'sidebar',
              },
            },
            {
              name: 'customSettings',
              type: 'json',
              label: '自定义设置',
              admin: {
                description: '高级页面配置（JSON 格式）',
              },
            },
          ],
        },
      ],
    },
  ],
}
