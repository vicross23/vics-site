import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { uploadthingStorage } from "@payloadcms/storage-uploadthing"
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from '~/collections/Media'
import { Users } from './collections/Users'
import { ExperienceType } from '~/collections/ExperienceType'
import { Experience } from '~/collections/Experience'
import { Content } from '~/collections/Content'
import { Project } from '~/collections/Project'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  graphQL: { disable: true },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Project, Experience, ExperienceType, Content],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  sharp,
  plugins: [
    uploadthingStorage({
      collections: {
        media: true,
      },
      clientUploads: true,
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
      },
    })
  ],
})
