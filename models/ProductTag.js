const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

const { Product, Tag } = require('./');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: sequelize.INTEGER, 
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },

    product_id: {
      type: sequelize.INTEGER, 
      references: {
        model: Product,
        key: 'id'
      }
    },

    tag_id: {
      type: sequelize.INTEGER, 
      references: {
        model: Tag,
        key: 'id'
      }
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
