import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Tags } from './collections/Tags'
import { Users } from './collections/Users'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { plugins } from './plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'https://cyberlilith.com',
  
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },

  editor: lexicalEditor(),
  
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
  }),

  collections: [Users, Media, Categories, Tags, Posts, Pages],
  
  globals: [Header, Footer],
  
  plugins,
  
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'https://cyberlilith.com',
    'http://localhost:3000',
    'http://localhost:3001',
  ].filter(Boolean),
  
  secret: process.env.PAYLOAD_SECRET || '',
  
  sharp,
  
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
