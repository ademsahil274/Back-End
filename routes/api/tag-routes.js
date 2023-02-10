const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data
  router.get('/', (req, res) => {
    Tag.findAll({
      include: {
        model: Product
      }
    }).then((tag) => {
      res.json(tag);
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
      where: { id: req.body.id },
      include: {
        model: Product
      }
    }).then((tag) => {
      res.json(tag);
    })
    .catch(err => {
      console.log(err);
      req.statusCode(500).json(err);
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
    where: { id: req.body.id }
  }).then((tag) => {
    if (!tag) {
      res.status(404).json({ message:''})
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

  });

module.exports = router;
