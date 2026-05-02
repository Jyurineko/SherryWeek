import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: '标签',
    plural: '标签',
  },
  admin: {
    useAsTitle: 'name',
    group: '内容管理',
  },
  orderable: true,
  defaultSort: 'name',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '标签名称',
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
  ],
}
