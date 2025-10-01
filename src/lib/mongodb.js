// src/lib/mongodb.js

import { MongoClient } from 'mongodb';

// Ambil URI koneksi dan nama database dari variabel lingkungan
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

// Lakukan pemeriksaan dasar untuk memastikan variabel lingkungan disetel
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Gunakan variabel cache global untuk menyimpan klien dan koneksi database
// Ini mencegah pembuatan koneksi baru pada setiap panggilan serverless
let cachedClient = null;
let cachedDb = null;

/**
 * Menghubungkan ke MongoDB Atlas atau menggunakan koneksi yang sudah di-cache.
 * @returns {object} Objek yang berisi klien (client) dan database (db).
 */
export async function connectToDatabase() {
  // 1. Jika sudah ada di cache, kembalikan yang sudah ada
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // 2. Jika belum ada, buat koneksi baru
  const client = await MongoClient.connect(uri);
  
  // 3. Tentukan database berdasarkan nama yang disetel di .env.local
  const db = client.db(dbName);

  // 4. Simpan koneksi di cache sebelum dikembalikan
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}