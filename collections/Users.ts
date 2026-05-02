import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: '用户',
    plural: '用户',
  },
  admin: {
    useAsTitle: 'email',
    group: '系统管理',
  },
  defaultSort: '-createdAt',
  auth: {
    useAPIKey: true,
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: ['admin', 'editor'],
      defaultValue: ['editor'],
      required: true,
      saveToJWT: true,
    },
    {
      name: 'name',
      type: 'text',
      label: '姓名',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: '头像',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: '简介',
    },
  ],
}
