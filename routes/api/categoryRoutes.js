const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{
      model: Product,
      // attributes: ['id', 'product_name', 'pr, 'stock', 'categ']
    }]
  }).then((category) => {
    res.json(category)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
      // attribute: ['category_id']
    }
  }).then((category) => {
    res.json(category);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then((category) => {
    res.json(category);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});
// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    {
    category_name: req.body.category_name
  },
  {
    where: { id: req.params.id }
  }).then((category) => {
    if (!category) {
      res.status(404).json({ message: 'Unable to find the ID in the category!'});
      return;
    }
    res.json(category);
  })
    .catch(err => {
      console.log(err);
      req.status(500).json(err);
    })
});
// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { id: req.params.id }
  }).then((category) => {
    if (!category) {
      res.status(404).json({ message: 'Unable to find the ID in the category!'});
      return;
    }
    res.json(category);
  })
  .catch(err => {
    console.log(err);
    req.status(500).json(err);
  })
});

module.exports = router;
