const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data
  router.get('/', (req, res) => {
    Tag.findAll({
      include: [{
        model: Product
      }]
    }).then((tag) => {
      res.json(tag)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// find a single tag by its `id`
// be sure to include its associated Product data
  router.get('/:id', (req, res) => {
    Tag.findOne({
      where: { id: req.params.id },
      include: {
        model: Product,
        // attributes: ['product_name', 'product_price', 'product_stock', 'category_id']
      }
    })
    .then(tag => res.json(tag))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// create a new tag
  router.post('/', (req, res) => {
    Tag.create({
      tag_name: req.body.tag_name
    }).then((tag) => {
      res.json(tag);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
// update a tag's name by its `id` value
  router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: { id: req.params.id }
  }).then((tag) => {
    if (!tag) {
      res.status(404).json({ message:'Unabel to Update Tags'})
    }
    res.json(tag)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  });

  // delete on tag by its `id` value
  router.delete('/:id', (req, res) => {
    Tag.destroy({ 
      where: {
        id: req.params.id
      }
    }).then(tag => {
      if (!tag) {
        res.status(404).json({ message: 'Unable to find Tag with this id!'});
        return;
      }
      res.json(tag);
    })
    .catch(err => {
      console.log(err);
      req.status(500).json(err);
    });
  });

module.exports = router;
