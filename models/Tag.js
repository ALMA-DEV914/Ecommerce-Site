const { Model, DataTypes } = require('sequelize');
//declare the model and data types
const sequelize = require('../config/connection.js');
//require the sequelize connection
class Tag extends Model {}
//declare or create the tag model
Tag.init(
  {
    // define id columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
  //define tag name columns
    tag_name: {
    type: DataTypes.STRING
  }
},
//sequelize the tag data model
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
