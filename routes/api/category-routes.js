const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  await Category.findAll({
    // be sure to include its associated Products
    include: [Product],
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      res.status(500).json(err);
    })
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  await Category.findOne({
    where:{id:req.params.id},
    // be sure to include its associated Products
    include: [Product],
  })
  .then((categoryData)=>{
    if(!categoryData){
      res.status(404).json({message:'No category with this id!'});
      return;
    }
    res.json(categoryData);
  })
    .catch((err) => {
      res.status(500).json(err);
    })
});

router.post('/', async (req, res) => {
  // create a new category
 await Category.create({
id: req.body.id,
category_name: req.body.category_name
  })
  .then((categoryData)=>res.json(categoryData))
  .catch((err) => {
    res.status(500).json(err);
  })
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update({
    category_name: req.body.category_name
  },
  {
    where:{
      id:req.params.id,
    },
  })
  .then((categoryData)=>{
    if(!categoryData){
      res.status(404).json({message:'No category with this id!'});
      return;
    }
    res.json(categoryData);
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({
where:{
  id: req.params.id
},
  })
  .then((categoryData)=>{
    if(!categoryData){
      res.status(404).json({message:'No category with this id!'});
      return;
    }
    res.json(categoryData);
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});
module.exports = router;
