const crypto = require('crypto');
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_X7DysxtaILK5@ep-hidden-morning-bigw8w9g-pooler.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

const newPassword = 'Admin@123456';
const salt = crypto.randomBytes(32).toString('hex');
const hash = crypto.pbkdf2Sync(newPassword, Buffer.from(salt, 'hex'), 25000, 512, 'sha256').toString('hex');

async function reset() {
  await client.connect();
  console.log('Connected to Neon PostgreSQL.');
  
  await client.query(`
    UPDATE users 
    SET salt = $1, hash = $2, login_attempts = 0, lock_until = NULL 
    WHERE id = 1 OR id = 2;
  `, [salt, hash]);

  console.log('Reset password successfully for tn6879065@gmail.com and admin123@gmail.com!');
  await client.end();
}

reset().catch(err => {
  console.error('Error resetting password:', err);
  process.exit(1);
});
