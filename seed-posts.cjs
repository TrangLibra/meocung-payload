const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_X7DysxtaILK5@ep-hidden-morning-bigw8w9g-pooler.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

const titles = [
  "Cách chăm sóc mèo con mới về nhà chi tiết từ A-Z",
  "Top 10 loại hạt cho mèo được ưa chuộng nhất hiện nay",
  "Dấu hiệu nhận biết mèo bị ốm và cách xử lý kịp thời",
  "Hướng dẫn huấn luyện mèo đi vệ sinh đúng chỗ trong 3 ngày",
  "Pate tươi cho mèo: Lợi ích và cách nấu tại nhà an toàn",
  "Tại sao mèo hay cắn tay chủ và cách sửa tật cắn bậy",
  "Lịch tiêm phòng đầy đủ cho mèo con và mèo trưởng thành",
  "Cách chọn cát vệ sinh khử mùi tốt nhất cho không gian nhỏ",
  "Mèo rụng lông nhiều: Nguyên nhân và giải pháp dứt điểm",
  "Khám phá các giống mèo lông ngắn phổ biến và dễ nuôi",
  "Có nên tắm cho mèo thường xuyên không? Lời khuyên từ bác sĩ thú y",
  "Chế độ dinh dưỡng khoa học giúp mèo tăng cân, lông bóng mượt",
  "Cách làm quen giữa mèo mới và mèo cũ không gây xung đột",
  "Mèo triệt sản nên ăn gì? Chăm sóc mèo sau phẫu thuật",
  "Nguyên nhân mèo bị nấm da và phác đồ điều trị hiệu quả",
  "Top các món đồ chơi giúp mèo giải tỏa stress và vận động",
  "Mèo mang thai mấy tháng? Dấu hiệu sắp sinh cần chuẩn bị gì",
  "Cách cắt móng cho mèo an toàn không làm mèo sợ hãi",
  "Mèo bị tiêu chảy: Nguyên nhân, cách bù nước và ăn kiêng",
  "So sánh thức ăn ướt và thức ăn hạt: Loại nào tốt hơn cho mèo?",
  "Giải mã tiếng kêu 'meo meo' và ngôn ngữ cơ thể của mèo cưng",
  "Cách khử mùi hôi nhà nuôi mèo hiệu quả tức thì",
  "Mèo bị búi lông trong ruột: Dấu hiệu nguy hiểm và cách phòng ngừa",
  "Có nên cho mèo uống sữa bò không? Tác hại ít người biết",
  "Bí quyết nuôi mèo béo khỏe cho người bận rộn đi làm cả ngày"
];

const categories = ['thuc-an-hat', 'pate-cho-meo', 'cat-ve-sinh', 'kinh-nghiem', 'giong-meo'];
const catImages = [
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1513360309081-38f0762daed1?w=800&auto=format&fit=crop&q=80"
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function seed() {
  await client.connect();
  console.log('Connected to Neon PostgreSQL database.');

  let inserted = 0;
  for (let i = 1; i <= 100; i++) {
    const baseTitle = titles[(i - 1) % titles.length];
    const title = i <= 25 ? baseTitle : `${baseTitle} (Kỳ ${Math.floor(i / 25) + 1} - Mẹo số ${i})`;
    const slug = `${slugify(title)}-${i}`;
    const category = categories[i % categories.length];
    const image = catImages[i % catImages.length];
    const summary = `Cẩm nang chia sẻ kinh nghiệm hữu ích về ${title.toLowerCase()}, giúp bạn chăm sóc mèo cưng luôn khỏe mạnh, sạch sẽ và đáng yêu mỗi ngày.`;
    
    // Ngày giờ đăng ngẫu nhiên trong 60 ngày gần đây
    const pastDays = Math.floor(Math.random() * 60);
    const pastHours = Math.floor(Math.random() * 24);
    const pastMinutes = Math.floor(Math.random() * 60);
    const publishedAt = new Date(Date.now() - (pastDays * 86400000 + pastHours * 3600000 + pastMinutes * 60000)).toISOString();

    const query = `
      INSERT INTO posts (title, slug, category, published_at, summary, cover_image, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      ON CONFLICT (slug) DO NOTHING
    `;

    await client.query(query, [
      title,
      slug,
      category,
      publishedAt,
      summary,
      image,
      'published'
    ]);
    inserted++;
  }

  const countRes = await client.query('SELECT COUNT(*) FROM posts');
  console.log(`Successfully created posts! Total posts now in database: ${countRes.rows[0].count}`);
  await client.end();
}

seed().catch(err => {
  console.error('Error seeding posts:', err);
  process.exit(1);
});
