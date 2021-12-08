const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
   attributes: ['id', 'tag_name'],
  // be sure to include its associated Product data
  include: [
    {model: Product, attributes:['id', 'product_name', 'price', 'stock', 'category_id'], through: ProductTag, as: 'products'}, 
    ]
  }).then(dbTagData => res.json(dbTagData))
    .catch((err) => {
     console.log(err);
     res.status(500).json(err)
    
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
     where: {
       tag_id: req.params.id,
       
     },
     attributes: ['id', 'tag_name'],
  // be sure to include its associated Product data
    include: [
      {model: Product, attributes:['id', 'product_name', 'price', 'stock', 'category_id'], through: ProductTag, as: 'products'},
      
    ]
}).then((dbTagData) => {
  if(dbTagData){
    res.status(500).json({message: 'No tag is found'});
    return;
  }
  res.json(dbTagData);
}).catch((err) => {
  console.log(err);
  res.status(404).json(err);
});
});

router.post('/', (req, res) => {
  // create a new tag
Tag.create(req.body)
   
 //return the category data and new category was added
   .then(dbNewTagData => {res.json(dbNewTagData);
     res.json(dbTagData);
 })
   // handle the invalid request
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   });
 });

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
     }
     // return error if data doesn't exists
  }).then(dbTagData => {
    if(!dbTagData[0]){
      res.status(404).json({message: 'No tag found with this id'});
      return;
    }
    //retrun the category data
    res.json(dbTagData);
    //handle the error
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
    //return error if no data found
  }).then(dbTagData => {
    if(dbTagData){
      res.status(404).json({message: 'No category found with this id'});
      return;
    }
    // return the category data
    res.json(dbTagData);
    //handle the error
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
// call back the router function
module.exports = router;
