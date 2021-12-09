const { Category } = require('../models');
//declare the category seed of data
const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];
//declare the whole data from category model
const seedCategories = () => Category.bulkCreate(categoryData);
//call back function
module.exports = seedCategories;
