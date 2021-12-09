const { Model, DataTypes } = require('sequelize');
//require the file path to Models
const sequelize = require('../config/connection.js');
//require the Sequelize package for connection
class Category extends Model {}
//declare Category model
Category.init(
  {
    // define id columns
    id:{
      //use the special sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      //this is the equivalent of SQL's 'NOT NULL' option
      allowNull: false,
      //instruct that this is the Primary Key
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true
    },
    //define category name columns
     category_name: {
       type: DataTypes.STRING,
       allowNull: false
  }
},
//call the sequelize to manipulate this category table model
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);
//call back function
module.exports = Category;
