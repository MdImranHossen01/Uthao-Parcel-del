import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log('🛢️ Database is connected successfully');

    app.listen(config.port, () => {
      console.log(`Uthao app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect to the database', err);
  }
}

main();