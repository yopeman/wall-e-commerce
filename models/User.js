import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [2, 50]
    }
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [2, 50]
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'customer'),
    defaultValue: 'customer'
  },
  phone_number: {
    type: DataTypes.STRING(20),
    validate: {
      is: /^[\+]?[0-9\s\-\(\)]{10,20}$/
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
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  defaultScope: {
    where: { is_deleted: false }
  },
  hooks: {
    beforeCreate: (user) => {
      if (user.email) {
        user.email = user.email.toLowerCase().trim();
      }
    }
  }
});

User.associate = function(models) {
  User.hasMany(models.Order, {
    foreignKey: 'user_id',
    as: 'orders',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};

User.prototype.toJSON = function() {
  const values = { ...this.get() };
  delete values.password;
  delete values.is_deleted;
  delete values.deleted_at;
  return values;
};

export default User;