import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: '文章',
    plural: '文章',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'status'],
    group: '内容管理',
  },
  defaultSort: '-publishedAt',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  versions: {
    drafts: true,
  },
  endpoints: [
    {
      path: '/:id/view',
      method: 'post',
      handler: async (req) => {
        const { id } = req.routeParams
        try {
          const post = await req.payload.findByID({
            collection: 'posts',
            id: Number(id),
          })
          await req.payload.update({
            collection: 'posts',
            id: Number(id),
            data: { views: (post.views || 0) + 1 },
          })
          return Response.json({ ok: true, views: (post.views || 0) + 1 })
        } catch {
          return Response.json({ ok: false }, { status: 500 })
        }
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create' && req.user && !data.author) {
          data.author = req.user.id
        }
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
              label: '标题',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              label: 'URL 标识',
              required: true,
              unique: true,
              index: true,
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: '摘要',
              required: true,
            },
            {
              name: 'content',
              type: 'richText',
              label: '正文',
              required: true,
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              label: '封面图',
            },
            {
              name: 'codeSnippet',
              type: 'code',
              label: '代码片段',
              admin: {
                language: 'typescript',
              },
            },
          ],
        },
        {
          label: '信息',
          fields: [
            {
              name: 'author',
              type: 'relationship',
              relationTo: 'users',
              label: '作者',
              required: true,
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              label: '分类',
              required: true,
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'tags',
              label: '标签',
              hasMany: true,
            },
            {
              name: 'readingTime',
              type: 'number',
              label: '阅读时长（分钟）',
              min: 1,
            },
            {
              name: 'sortWeight',
              type: 'number',
              label: '排序权重',
              defaultValue: 0,
            },
            {
              name: 'views',
              type: 'number',
              label: '阅读次数',
              min: 0,
              defaultValue: 0,
            },
          ],
        },
        {
          label: '发布',
          fields: [
            {
              name: 'status',
              type: 'select',
              label: '状态',
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
              label: '发布时间',
              required: true,
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
          ],
        },
      ],
    },
  ],
}
