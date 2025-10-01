// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: 'mongodb+srv://raffaaahitipeuw:raffahitipeuw@typing0.fujitgb.mongodb.net/?retryWrites=true&w=majority&appName=typing0',
    DB_NAME: 'typing_leaderboard_db',
  },
};

module.exports = nextConfig;