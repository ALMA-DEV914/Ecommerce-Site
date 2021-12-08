//require the express package router
const router = require('express').Router();
//require the models
const { Category, Product, ProductTag, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ['id', 'category_name'],
    // be sure to include its associated Products
    include: [{
      model: Product, attributes:['id', 'product_name', 'price', 'stock', 'category_id']},
    
    ] 
    //return the category data
}).then(dbCategoryData => res.json(dbCategoryData))
//handle the query that doesn't exist
  .catch(err => {
    console.log(err);
    res.status(500).json(err);

  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    // be sure to include its associated Products
    include: [{
    model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']},
    ]
//if no data found return error
  }).then(dbCategoryData => {
    if(!dbCategoryData){
      res.status(404).json({message: 'Category not found'});
      return;
    }
    //retrun the category data
    res.json(dbCategoryData);
  })
  // handle the invalid request
  .catch((err) => {
   console.log(err);
   res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
   
//return the category data and new category was added
  .then(dbNewCategoryData => {res.json(dbNewCategoryData);
    res.json(dbCategoryData);
})
  // handle the invalid request
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
router.put('/:id', (req, res) => {
  // create a new category
  Category.create(req.body)
   
//return the category data and new category was added
  .then(dbNewCategoryData => {res.json(dbNewCategoryData);
    res.json(dbCategoryData);
})
  // handle the invalid request
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
 module.exports = router;