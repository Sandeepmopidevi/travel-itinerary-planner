const dotenv = require('dotenv');
const path = require('path');

const loadEnv = () => {
  dotenv.config({ path: path.resolve(__dirname, '.env') });
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error('Missing required environment variables!');
    process.exit(1);
  }
};

module.exports = loadEnv;
