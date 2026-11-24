const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_X7DysxtaILK5@ep-hidden-morning-bigw8w9g-pooler.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();

  // Bổ sung các cột upload cho bảng media
  await client.query(`
    ALTER TABLE media ADD COLUMN IF NOT EXISTS filename VARCHAR(255);
    ALTER TABLE media ADD COLUMN IF NOT EXISTS mime_type VARCHAR(100);
    ALTER TABLE media ADD COLUMN IF NOT EXISTS filesize NUMERIC;
    ALTER TABLE media ADD COLUMN IF NOT EXISTS width NUMERIC;
    ALTER TABLE media ADD COLUMN IF NOT EXISTS height NUMERIC;
    ALTER TABLE media ADD COLUMN IF NOT EXISTS focal_x NUMERIC;
    ALTER TABLE media ADD COLUMN IF NOT EXISTS focal_y NUMERIC;
    ALTER TABLE media ALTER COLUMN url DROP NOT NULL;
    
    ALTER TABLE posts ADD COLUMN IF NOT EXISTS media_file_id INTEGER;
  `);

  console.log('Successfully updated schema for media upload & post relation!');
  await client.end();
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
