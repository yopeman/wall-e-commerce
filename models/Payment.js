import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true
  },
  method: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  transaction_id: {
    type: DataTypes.STRING(100),
    unique: true
  },
  receipt_url: {
    type: DataTypes.STRING(500),
    validate: {
      isUrl: true
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
  tableName: 'payments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  defaultScope: {
    where: { is_deleted: false }
  },
  hooks: {
    beforeUpdate: (payment) => {
      if (payment.changed('status') && payment.status === 'completed') {
        payment.paid_at = new Date();
      }
    }
  },
  indexes: [
    { fields: ['order_id'], unique: true },
    { fields: ['status'] },
    { fields: ['transaction_id'], unique: true }
  ]
});

Payment.associate = function(models) {
  Payment.belongsTo(models.Order, {
    foreignKey: 'order_id',
    as: 'order',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};

Payment.prototype.isSuccessful = function() {
  return this.status === 'completed';
};

Payment.prototype.isPending = function() {
  return this.status === 'pending';
};

export default Payment;