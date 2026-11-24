const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_X7DysxtaILK5@ep-hidden-morning-bigw8w9g-pooler.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();

  // Tạo và bổ sung đầy đủ các cột cho payload_locked_documents_rels (với 1 dấu gạch)
  await client.query(`
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
      reviews_id INTEGER,
      media_id INTEGER
    );
    ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS banners_id INTEGER;
    ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS coupons_id INTEGER;
    ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS orders_id INTEGER;
    ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS reviews_id INTEGER;
    ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS media_id INTEGER;
    ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS posts_id INTEGER;
    ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS products_id INTEGER;
    ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS users_id INTEGER;
  `);

  // Tạo thêm bảng payload_locked_documents__rels (với 2 dấu gạch dưới theo chuẩn Drizzle / Payload 3.0)
  await client.query(`
    CREATE TABLE IF NOT EXISTS payload_locked_documents__rels (
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
      reviews_id INTEGER,
      media_id INTEGER
    );
    ALTER TABLE payload_locked_documents__rels ADD COLUMN IF NOT EXISTS banners_id INTEGER;
    ALTER TABLE payload_locked_documents__rels ADD COLUMN IF NOT EXISTS coupons_id INTEGER;
    ALTER TABLE payload_locked_documents__rels ADD COLUMN IF NOT EXISTS orders_id INTEGER;
    ALTER TABLE payload_locked_documents__rels ADD COLUMN IF NOT EXISTS reviews_id INTEGER;
    ALTER TABLE payload_locked_documents__rels ADD COLUMN IF NOT EXISTS media_id INTEGER;
    ALTER TABLE payload_locked_documents__rels ADD COLUMN IF NOT EXISTS posts_id INTEGER;
    ALTER TABLE payload_locked_documents__rels ADD COLUMN IF NOT EXISTS products_id INTEGER;
    ALTER TABLE payload_locked_documents__rels ADD COLUMN IF NOT EXISTS users_id INTEGER;
  `);

  console.log('Successfully created both locked_documents_rels tables and all columns!');
  await client.end();
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
