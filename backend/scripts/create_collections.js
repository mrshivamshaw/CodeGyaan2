import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const DB_URI = process.env.DB_URI;

async function main() {
  if (!DB_URI) {
    console.error('DB_URI not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }

  const modelsDir = path.resolve(process.cwd(), 'models');
  if (!fs.existsSync(modelsDir)) {
    console.error('models directory not found at', modelsDir);
    process.exit(1);
  }

  const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const modulePath = pathToFileURL(path.join(modelsDir, file)).href;
    try {
      await import(modulePath);
    } catch (err) {
      console.warn('Failed importing model', file, err.message);
    }
  }

  const existingCollections = (await mongoose.connection.db.listCollections().toArray()).map(c => c.name);

  const created = [];
  for (const name of mongoose.modelNames()) {
    const model = mongoose.model(name);
    const collName = model.collection.collectionName;
    if (!existingCollections.includes(collName)) {
      try {
        await mongoose.connection.db.createCollection(collName);
        created.push(collName);
        console.log('Created collection:', collName);
      } catch (err) {
        console.warn('Could not create collection', collName, err.message);
      }
    } else {
      console.log('Collection already exists:', collName);
    }
  }

  console.log('Done. New collections created:', created.length ? created : 'none');
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
