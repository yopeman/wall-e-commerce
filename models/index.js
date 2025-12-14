import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

// Import all models
const importModel = async (modelName) => {
  const modelPath = path.join(__dirname, `${modelName}.js`);
  const modelModule = await import(`file://${modelPath}`);
  return modelModule.default;
};

// Load all models
db.User = await importModel('User');
db.Category = await importModel('Category');
db.Product = await importModel('Product');
db.ProductImage = await importModel('ProductImage');
db.Order = await importModel('Order');
db.OrderItem = await importModel('OrderItem');
db.Payment = await importModel('Payment');

// Set up associations
Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
export default db;