import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Mèo Cưng CMS',
      favicon: '/favicon.ico',
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      access: {
        read: () => true,
      },
      fields: [],
    },
    {
      slug: 'posts',
      labels: {
        singular: 'Cẩm nang nuôi mèo',
        plural: 'Cẩm nang nuôi mèo',
      },
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'publishedAt', 'status'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tiêu đề bài viết',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          label: 'Đường dẫn (Slug URL)',
          required: true,
          unique: true,
        },
        {
          name: 'category',
          type: 'select',
          label: 'Chuyên mục cẩm nang',
          options: [
            { label: 'Thức ăn hạt dinh dưỡng', value: 'thuc-an-hat' },
            { label: 'Pate & Súp thưởng', value: 'pate-cho-meo' },
            { label: 'Cát vệ sinh & Khử mùi', value: 'cat-ve-sinh' },
            { label: 'Kinh nghiệm nuôi mèo', value: 'kinh-nghiem' },
            { label: 'Giống mèo', value: 'giong-meo' },
          ],
          defaultValue: 'kinh-nghiem',
          required: true,
        },
        {
          name: 'publishedAt',
          type: 'date',
          label: 'Ngày xuất bản (Datetime)',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
          defaultValue: () => new Date().toISOString(),
        },
        {
          name: 'summary',
          type: 'textarea',
          label: 'Tóm tắt bài viết',
        },
        {
          name: 'coverImage',
          type: 'text',
          label: 'URL Ảnh bìa',
          defaultValue: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80',
        },
        {
          name: 'status',
          type: 'select',
          label: 'Trạng thái',
          options: [
            { label: 'Bản nháp (Draft)', value: 'draft' },
            { label: 'Đã xuất bản (Published)', value: 'published' },
          ],
          defaultValue: 'published',
        },
      ],
    },
    {
      slug: 'products',
      labels: {
        singular: 'Sản phẩm hạt & pate',
        plural: 'Sản phẩm hạt & pate',
      },
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
          label: 'Tên sản phẩm',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          label: 'Giá bán (VNĐ)',
          required: true,
        },
        {
          name: 'category',
          type: 'select',
          label: 'Danh mục',
          options: [
            { label: 'Thức ăn hạt', value: 'thuc-an-hat' },
            { label: 'Pate cho mèo', value: 'pate-cho-meo' },
            { label: 'Cát vệ sinh', value: 'cat-ve-sinh' },
          ],
          required: true,
        },
        {
          name: 'image',
          type: 'text',
          label: 'URL Ảnh',
        },
        {
          name: 'weight',
          type: 'text',
          label: 'Quy cách (2kg, gói 4 thanh...)',
        },
        {
          name: 'inStock',
          type: 'checkbox',
          label: 'Còn hàng',
          defaultValue: true,
        },
      ],
    },
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'meocung_payload_secret_key_2026_super_secure',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_X7DysxtaILK5@ep-hidden-morning-bigw8w9g-pooler.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    },
  }),
})
