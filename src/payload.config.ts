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
    // 1. NGƯỜI DÙNG & TÀI KHOẢN (Auth Collection)
    {
      slug: 'users',
      labels: {
        singular: 'Tài khoản quản trị',
        plural: 'Quản lý Tài khoản (Users)',
      },
      auth: true,
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'role',
          type: 'select',
          label: 'Phân quyền',
          options: [
            { label: 'Super Admin', value: 'admin' },
            { label: 'Biên tập viên (Editor)', value: 'editor' },
            { label: 'Khách hàng', value: 'customer' },
          ],
          defaultValue: 'admin',
        },
      ],
    },

    // 2. CẨM NANG NUÔI MÈO (Posts)
    {
      slug: 'posts',
      labels: {
        singular: 'Bài viết cẩm nang',
        plural: 'Cẩm nang nuôi mèo (100+ bài)',
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
          label: 'Trạng thái xuất bản',
          options: [
            { label: 'Bản nháp (Draft)', value: 'draft' },
            { label: 'Đã xuất bản (Published)', value: 'published' },
          ],
          defaultValue: 'published',
        },
      ],
    },

    // 3. SẢN PHẨM HẠT & PATE (Products)
    {
      slug: 'products',
      labels: {
        singular: 'Sản phẩm hạt & pate',
        plural: 'Sản phẩm hạt & pate',
      },
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'category', 'price', 'inStock'],
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
          label: 'Danh mục sản phẩm',
          options: [
            { label: 'Thức ăn hạt dinh dưỡng', value: 'thuc-an-hat' },
            { label: 'Pate & Súp thưởng', value: 'pate-cho-meo' },
            { label: 'Cát vệ sinh khử mùi', value: 'cat-ve-sinh' },
            { label: 'Phụ kiện & Đồ chơi', value: 'phu-kien' },
          ],
          required: true,
        },
        {
          name: 'image',
          type: 'text',
          label: 'URL Ảnh sản phẩm',
        },
        {
          name: 'weight',
          type: 'text',
          label: 'Quy cách (2kg, gói 4 thanh...)',
        },
        {
          name: 'inStock',
          type: 'checkbox',
          label: 'Còn hàng trong kho',
          defaultValue: true,
        },
      ],
    },

    // 4. BANNER & SLIDER KHUYẾN MÃI (Banners)
    {
      slug: 'banners',
      labels: {
        singular: 'Banner quảng cáo',
        plural: 'Banner khuyến mãi & Slider',
      },
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'position', 'isActive', 'linkUrl'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tên chiến dịch / Tiêu đề Banner',
          required: true,
        },
        {
          name: 'imageUrl',
          type: 'text',
          label: 'URL Hình ảnh Banner',
          required: true,
        },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'Đường dẫn liên kết khi click',
          defaultValue: '/san-pham',
        },
        {
          name: 'position',
          type: 'select',
          label: 'Vị trí hiển thị',
          options: [
            { label: 'Slider đầu trang chủ', value: 'home_slider' },
            { label: 'Banner giữa trang', value: 'home_middle' },
            { label: 'Popup khuyến mãi', value: 'popup' },
          ],
          defaultValue: 'home_slider',
        },
        {
          name: 'isActive',
          type: 'checkbox',
          label: 'Đang hiển thị',
          defaultValue: true,
        },
      ],
    },

    // 5. MÃ GIẢM GIÁ & VOUCHER (Coupons)
    {
      slug: 'coupons',
      labels: {
        singular: 'Mã giảm giá',
        plural: 'Mã giảm giá & Voucher',
      },
      admin: {
        useAsTitle: 'code',
        defaultColumns: ['code', 'discountPercent', 'minOrderValue', 'isActive'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'code',
          type: 'text',
          label: 'Mã khuyến mãi (VD: MEOCUNG10, FREESHIP)',
          required: true,
          unique: true,
        },
        {
          name: 'discountPercent',
          type: 'number',
          label: 'Tỷ lệ giảm giá (%)',
          required: true,
        },
        {
          name: 'minOrderValue',
          type: 'number',
          label: 'Giá trị đơn tối thiểu (VNĐ)',
          defaultValue: 0,
        },
        {
          name: 'expiryDate',
          type: 'date',
          label: 'Hạn sử dụng',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'isActive',
          type: 'checkbox',
          label: 'Kích hoạt mã',
          defaultValue: true,
        },
      ],
    },

    // 6. ĐƠN HÀNG (Orders)
    {
      slug: 'orders',
      labels: {
        singular: 'Đơn hàng',
        plural: 'Quản lý đơn hàng (Orders)',
      },
      admin: {
        useAsTitle: 'customerName',
        defaultColumns: ['customerName', 'customerPhone', 'totalAmount', 'orderStatus', 'createdAt'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'customerName',
          type: 'text',
          label: 'Họ tên khách hàng',
          required: true,
        },
        {
          name: 'customerPhone',
          type: 'text',
          label: 'Số điện thoại',
          required: true,
        },
        {
          name: 'shippingAddress',
          type: 'textarea',
          label: 'Địa chỉ giao hàng',
          required: true,
        },
        {
          name: 'totalAmount',
          type: 'number',
          label: 'Tổng tiền (VNĐ)',
          required: true,
        },
        {
          name: 'orderStatus',
          type: 'select',
          label: 'Trạng thái đơn',
          options: [
            { label: 'Chờ xác nhận', value: 'pending' },
            { label: 'Đang đóng gói', value: 'processing' },
            { label: 'Đang vận chuyển', value: 'shipping' },
            { label: 'Đã hoàn thành', value: 'delivered' },
            { label: 'Đã hủy', value: 'cancelled' },
          ],
          defaultValue: 'pending',
        },
        {
          name: 'notes',
          type: 'textarea',
          label: 'Ghi chú đơn hàng',
        },
      ],
    },

    // 7. ĐÁNH GIÁ & PHẢN HỒI (Reviews)
    {
      slug: 'reviews',
      labels: {
        singular: 'Đánh giá sản phẩm',
        plural: 'Đánh giá & Phản hồi (Reviews)',
      },
      admin: {
        useAsTitle: 'reviewerName',
        defaultColumns: ['reviewerName', 'rating', 'comment', 'isApproved'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'reviewerName',
          type: 'text',
          label: 'Tên khách đánh giá',
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Số sao (1 - 5)',
          min: 1,
          max: 5,
          defaultValue: 5,
          required: true,
        },
        {
          name: 'comment',
          type: 'textarea',
          label: 'Nội dung nhận xét',
          required: true,
        },
        {
          name: 'isApproved',
          type: 'checkbox',
          label: 'Duyệt hiển thị ra web',
          defaultValue: true,
        },
      ],
    },

    // 8. KHO MEDIA / TỆP TIN & HÌNH ẢNH (Media)
    {
      slug: 'media',
      labels: {
        singular: 'Tệp tin hình ảnh',
        plural: 'Thư viện hình ảnh (Media)',
      },
      admin: {
        useAsTitle: 'alt',
        defaultColumns: ['alt', 'url', 'createdAt'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          label: 'Mô tả hình ảnh (Alt text)',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Đường dẫn URL ảnh',
          required: true,
        },
      ],
    },
  ],

  // GLOBALS: Phân hệ Cấu hình toàn trang (Đặc trưng của Payload CMS)
  globals: [
    {
      slug: 'site-settings',
      label: 'Cấu hình chung website (Header/Footer)',
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'siteName',
          type: 'text',
          label: 'Tên cửa hàng',
          defaultValue: 'Mèo Cưng Pet Shop - Thức Ăn & Cẩm Nang Nuôi Mèo',
        },
        {
          name: 'hotline',
          type: 'text',
          label: 'Số điện thoại Hotline',
          defaultValue: '0382 542 737',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Địa chỉ cửa hàng',
          defaultValue: '123 Đường Cầu Giấy, Quận Cầu Giấy, TP. Hà Nội',
        },
        {
          name: 'facebookUrl',
          type: 'text',
          label: 'Link Fanpage Facebook',
          defaultValue: 'https://facebook.com/meocung',
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
      ssl: {
        rejectUnauthorized: false,
      },
    },
    push: true,
  }),
})
