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
      model: Product},
    
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
    ...req.body,
    where: {
      id: req.params.id
    },
    // be sure to include its associated Products
    include: [{
    model: Product},
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
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name,
  })
   
//return the category data and new category was added
  .then(dbProductData => res.json(dbProductData))
  // handle the invalid request
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a new category
  Category.update({
    category_name: req.body.category_name},
    {
    where: {
       id: req.params.id,
    }
    })
  //return the category data and new category was added
  .then((dbCategoryData) => {
    if(!dbCategoryData){
     res.status(500).json({message: 'No category id found'});
     return;
    }
    res.json(dbCategoryData);
})
  // handle the invalid request
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  //if no id found return empty
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'no category found for this id' });
        return;
      }
      //return category data if found
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//call back function
 module.exports = router;