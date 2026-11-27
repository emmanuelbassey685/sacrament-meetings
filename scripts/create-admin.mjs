
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import { createInterface } from 'node:readline/promises';

async function askHidden(question) {
  const input = process.stdin;

  if (!input.isTTY || typeof input.setRawMode !== 'function') {
    throw new Error('Run this script in an interactive terminal.');
  }

  process.stdout.write(question);
  input.setRawMode(true);
  input.resume();
  input.setEncoding('utf8');

  return new Promise((resolve, reject) => {
    let value = '';

    function cleanup() {
      input.removeListener('data', onData);
      input.setRawMode(false);
      input.pause();
    }

    function onData(chunk) {
      for (const char of chunk) {
        if (char === '\r' || char === '\n') {
          cleanup();
          process.stdout.write('\n');
          resolve(value);
          return;
        }

        if (char === '\u0003') {
          cleanup();
          reject(new Error('Setup cancelled.'));
          return;
        }

        if (char === '\u007f' || char === '\b') {
          value = value.slice(0, -1);
        } else if (char >= ' ') {
          value += char;
        }
      }
    }

    input.on('data', onData);
  });
}

async function main() {
  const connectionString =
    process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL or POSTGRES_URL is missing.');
  }

  const sql = neon(connectionString);

  const existing = await sql`SELECT id FROM app_users LIMIT 1`;

  if (existing.length > 0) {
    throw new Error(
      'An administrator account already exists. Setup cannot create another.'
    );
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const name = (await rl.question('Administrator name: ')).trim();
  const email = (await rl.question('Administrator email: '))
    .trim()
    .toLowerCase();

  rl.close();

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Enter a valid name and email address.');
  }

  const password = await askHidden('Create password: ');
  const confirmation = await askHidden('Confirm password: ');

  if (password.length < 12) {
    throw new Error('Password must contain at least 12 characters.');
  }

  if (password !== confirmation) {
    throw new Error('The passwords do not match.');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const result = await sql`
    INSERT INTO app_users (name, email, password_hash)
    VALUES (${name}, ${email}, ${passwordHash})
    RETURNING id
  `;

  console.log(`Administrator account created. Account ID: ${result[0].id}`);
}

main().catch((error) => {
  console.error('Administrator setup failed:', error.message);
  process.exitCode = 1;
});
