const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_X7DysxtaILK5@ep-hidden-morning-bigw8w9g-pooler.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function updateDB() {
  await client.connect();
  console.log('Connected to Neon PostgreSQL database.');

  // Tạo bảng banners
  await client.query(`
    CREATE TABLE IF NOT EXISTS banners (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      image_url TEXT NOT NULL,
      link_url TEXT DEFAULT '/san-pham',
      position VARCHAR(100) DEFAULT 'home_slider',
      is_active BOOLEAN DEFAULT TRUE,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
  console.log('Table banners ready.');

  // Tạo bảng coupons
  await client.query(`
    CREATE TABLE IF NOT EXISTS coupons (
      id SERIAL PRIMARY KEY,
      code VARCHAR(100) UNIQUE NOT NULL,
      discount_percent NUMERIC NOT NULL,
      min_order_value NUMERIC DEFAULT 0,
      expiry_date TIMESTAMP WITH TIME ZONE,
      is_active BOOLEAN DEFAULT TRUE,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
  console.log('Table coupons ready.');

  // Tạo bảng orders
  await client.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      customer_name VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(50) NOT NULL,
      shipping_address TEXT NOT NULL,
      total_amount NUMERIC NOT NULL,
      order_status VARCHAR(50) DEFAULT 'pending',
      notes TEXT,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
  console.log('Table orders ready.');

  // Tạo bảng reviews
  await client.query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      reviewer_name VARCHAR(255) NOT NULL,
      rating NUMERIC DEFAULT 5,
      comment TEXT NOT NULL,
      is_approved BOOLEAN DEFAULT TRUE,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
  console.log('Table reviews ready.');

  // Insert seed data cho Banners
  await client.query(`
    INSERT INTO banners (title, image_url, link_url, position, is_active)
    VALUES 
    ('Siêu Hội Hạt Mèo - Giảm Đến 30%', 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1200&auto=format&fit=crop&q=80', '/san-pham', 'home_slider', true),
    ('Pate Ciao Churu - Mua 5 Tặng 1', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&auto=format&fit=crop&q=80', '/san-pham', 'home_slider', true)
    ON CONFLICT DO NOTHING;
  `);

  // Insert seed data cho Coupons
  await client.query(`
    INSERT INTO coupons (code, discount_percent, min_order_value, is_active)
    VALUES 
    ('MEOCUNG10', 10, 200000, true),
    ('FREESHIP', 100, 300000, true),
    ('VIPCAT20', 20, 500000, true)
    ON CONFLICT (code) DO NOTHING;
  `);

  // Insert seed data cho Orders
  await client.query(`
    INSERT INTO orders (customer_name, customer_phone, shipping_address, total_amount, order_status, notes)
    VALUES 
    ('Trần Thanh Anh Trang', '0912345678', '123 Cầu Giấy, Hà Nội', 450000, 'processing', 'Giao giờ hành chính'),
    ('Nguyễn Văn An', '0987654321', '45 Lê Duẩn, Đà Nẵng', 320000, 'delivered', 'Đã nhận hàng')
    ON CONFLICT DO NOTHING;
  `);

  // Insert seed data cho Reviews
  await client.query(`
    INSERT INTO reviews (reviewer_name, rating, comment, is_approved)
    VALUES 
    ('Thu Hà', 5, 'Hạt thơm, mèo nhà mình rất thích ăn, đóng gói cẩn thận!', true),
    ('Minh Quân', 5, 'Giao hàng nhanh, pate date mới toanh, shop nhiệt tình 10 sao.', true)
    ON CONFLICT DO NOTHING;
  `);

  console.log('All new tables and demo data created successfully!');
  await client.end();
}

updateDB().catch(err => {
  console.error('Error updating DB:', err);
  process.exit(1);
});
