import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'

import { Categories } from './collections/Categories.js'
import { Media } from './collections/Media.js'
import { Posts } from './collections/Posts.js'
import { Tags } from './collections/Tags.js'
import { Users } from './collections/Users.js'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'https://cyberlilith.com',
  editor: lexicalEditor(),
  collections: [Users, Media, Categories, Tags, Posts],
  secret: process.env.PAYLOAD_SECRET || '',
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
  }),
  sharp,
  typescript: {
    outputFile: 'payload-types.ts',
  },
})
