const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_X7DysxtaILK5@ep-hidden-morning-bigw8w9g-pooler.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

const sampleProducts = [
  {
    name: 'Hạt Royal Canin Mother & Babycat 2kg',
    price: 380000,
    category: 'thuc-an-hat',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&auto=format&fit=crop&q=80',
    weight: 'Túi 2kg',
    in_stock: true,
  },
  {
    name: 'Hạt Reflex Plus Vị Cá Hồi & Gạo Cho Mèo Lớn 1.5kg',
    price: 260000,
    category: 'thuc-an-hat',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop&q=80',
    weight: 'Túi 1.5kg',
    in_stock: true,
  },
  {
    name: 'Pate Ciao Churu Vị Gà & Sò Điệp (Gói 4 thanh)',
    price: 45000,
    category: 'pate-cho-meo',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&auto=format&fit=crop&q=80',
    weight: 'Gói 4 thanh (56g)',
    in_stock: true,
  },
  {
    name: 'Pate Whiskas Vị Cá Thu Cho Mèo 85g',
    price: 18000,
    category: 'pate-cho-meo',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&auto=format&fit=crop&q=80',
    weight: 'Gói 85g',
    in_stock: true,
  },
  {
    name: 'Cát Vệ Sinh Đậu Nành Tofu Cature Khử Mùi Hữu Cơ 6L',
    price: 135000,
    category: 'cat-ve-sinh',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&auto=format&fit=crop&q=80',
    weight: 'Túi 6L (2.4kg)',
    in_stock: true,
  },
];

async function seedProducts() {
  await client.connect();
  console.log('Connected to Neon PostgreSQL.');

  for (const p of sampleProducts) {
    await client.query(`
      INSERT INTO products (name, price, category, image, weight, in_stock, updated_at, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
    `, [p.name, p.price, p.category, p.image, p.weight, p.in_stock]);
  }

  const count = await client.query('SELECT count(*) FROM products');
  console.log(`Successfully added products! Total products now: ${count.rows[0].count}`);
  await client.end();
}

seedProducts().catch(err => {
  console.error('Error seeding products:', err);
  process.exit(1);
});
