import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      len: [3, 200]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  defaultScope: {
    where: { is_deleted: false }
  },
  indexes: [
    { fields: ['name'] },
    { fields: ['category_id'] },
    { fields: ['price'] }
  ]
});

Product.associate = function(models) {
  Product.belongsTo(models.Category, {
    foreignKey: 'category_id',
    as: 'category',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  });

  Product.hasMany(models.ProductImage, {
    foreignKey: 'product_id',
    as: 'images',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Product.hasMany(models.OrderItem, {
    foreignKey: 'product_id',
    as: 'order_items',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  });
};

Product.prototype.isInStock = function(quantity = 1) {
  return this.stock_quantity >= quantity;
};

Product.prototype.reduceStock = function(quantity = 1) {
  if (this.isInStock(quantity)) {
    this.stock_quantity -= quantity;
    return true;
  }
  return false;
};

export default Product;