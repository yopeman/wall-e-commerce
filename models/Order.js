import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  total_price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending'
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
  tableName: 'orders',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  defaultScope: {
    where: { is_deleted: false }
  },
  hooks: {
    beforeCreate: async (order) => {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      order.order_number = `ORD-${timestamp}-${random}`;
    }
  },
  indexes: [
    { fields: ['user_id'] },
    { fields: ['status'] }
  ]
});

Order.associate = function(models) {
  Order.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Order.hasMany(models.OrderItem, {
    foreignKey: 'order_id',
    as: 'items',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Order.hasOne(models.Payment, {
    foreignKey: 'order_id',
    as: 'payment',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};

export default Order;