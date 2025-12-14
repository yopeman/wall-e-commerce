import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  is_primary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  tableName: 'product_images',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  defaultScope: {
    where: { is_deleted: false }
  },
  hooks: {
    beforeCreate: async (image) => {
      if (image.is_primary) {
        await ProductImage.update(
          { is_primary: false },
          {
            where: {
              product_id: image.product_id,
              is_primary: true
            }
          }
        );
      }
    }
  },
  indexes: [
    { fields: ['product_id'] },
    { fields: ['is_primary'] }
  ]
});

ProductImage.associate = function(models) {
  ProductImage.belongsTo(models.Product, {
    foreignKey: 'product_id',
    as: 'product',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};

export default ProductImage;