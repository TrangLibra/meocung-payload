const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_X7DysxtaILK5@ep-hidden-morning-bigw8w9g-pooler.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();
  console.log('Connected to Neon PostgreSQL.');

  // Tạo bảng payload_preferences nếu chưa có
  await client.query(`
    CREATE TABLE IF NOT EXISTS payload_preferences (
      id SERIAL PRIMARY KEY,
      key VARCHAR(255),
      value JSONB,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  // Tạo bảng payload_preferences_rels với "order" trong dấu ngoặc kép vì order là từ khóa của SQL
  await client.query(`
    CREATE TABLE IF NOT EXISTS payload_preferences_rels (
      id SERIAL PRIMARY KEY,
      "order" INTEGER,
      parent_id INTEGER,
      path VARCHAR(255),
      users_id INTEGER
    );
  `);

  // Tạo các bảng locked documents
  await client.query(`
    CREATE TABLE IF NOT EXISTS payload_locked_documents (
      id SERIAL PRIMARY KEY,
      global_slug VARCHAR(255),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS payload_locked_documents_rels (
      id SERIAL PRIMARY KEY,
      "order" INTEGER,
      parent_id INTEGER,
      path VARCHAR(255),
      users_id INTEGER,
      posts_id INTEGER,
      products_id INTEGER,
      banners_id INTEGER,
      coupons_id INTEGER,
      orders_id INTEGER,
      reviews_id INTEGER
    );
  `);

  console.log('Successfully created payload_preferences_rels and related tables!');
  await client.end();
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
