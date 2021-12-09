const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define id columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    //define the product name column that equal to product id
    product_id: {
    type: DataTypes.INTEGER,
    references: {
       model: 'product',
       key: 'id'
    }
  },
  //define the tag id that equal to tag_id
   tag_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tag',
      key: 'id'
    }
  }
},
 { 
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);
//call back function
module.exports = ProductTag;
