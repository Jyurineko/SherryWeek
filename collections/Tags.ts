import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
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
