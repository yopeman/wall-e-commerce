import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  subtotal_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
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
  tableName: 'order_items',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  defaultScope: {
    where: { is_deleted: false }
  },
  hooks: {
    beforeValidate: (item) => {
      if (item.quantity && item.unit_price) {
        item.subtotal_price = item.quantity * item.unit_price;
      }
    }
  },
  indexes: [
    { fields: ['order_id'] },
    { fields: ['product_id'] }
  ]
});

OrderItem.associate = function(models) {
  OrderItem.belongsTo(models.Order, {
    foreignKey: 'order_id',
    as: 'order',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  OrderItem.belongsTo(models.Product, {
    foreignKey: 'product_id',
    as: 'product',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  });
};

export default OrderItem;