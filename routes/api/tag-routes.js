//require the router package
const router = require('express').Router();
//require the associated model tables endpoints
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
   attributes: ['id', 'tag_name'],
  // be sure to include its associated Product data
  include: [
    {model: Product,
    through: ProductTag, as: 'products'}, 
    ]
    //return tag data
  }).then(dbTagData => res.json(dbTagData))
  //handle error
    .catch((err) => {
     console.log(err);
     res.status(500).json(err)
    
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({ 
    ...req.body,
     where: {
       id: req.params.id
     },
  // be sure to include its associated Product data
    include: [
      {model: Product,
      through: ProductTag, as: 'products'},
      ]
      //check if there's no tag id and return false
}).then(dbTagData => {
  if(!dbTagData){
    res.status(500).json({message: 'No tag is found'});
    return;
  }
  //return tag data if found by id
  res.json(dbTagData);
//handle error
}).catch((err) => {
  console.log(err);
  res.status(404).json(err);
 });
});

router.post('/', (req, res) => {
  // create a new tag
Tag.create({
    tag_name: req.body.tag_name,
  })
  
 //return the category data and new category was added
   .then((dbTagData) => res.json(dbTagData))
   
     // handle the invalid request
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   
   });
 });

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
      where: {
        id: req.params.id,
       },
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
      id: req.params.id,
    },
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
