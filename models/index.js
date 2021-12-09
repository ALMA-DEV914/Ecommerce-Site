// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const { belongsToMany } = require('./Product');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'

});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
    through: {model: ProductTag,
    unique: false
},
    foreignKey: 'product_id',
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
      through: {model: Tag,
      unique: false
},
      foreignKey: 'tag_id'
  });

  //call back functions
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
