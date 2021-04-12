const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const Images = db.images;

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Images.findAll()
    .then((images) => {
      if (images && !images.length) {
        return res.status(200).json([]);
      }
      res.json(images);
    })
    .catch((err) => res.status(404).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Images.create({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
  })
    .then((image) => res.status(201).json(image))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Images.update(
    {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
    },
    { where: { id: req.params.id } }
  )
    .then((image) => res.status(200).json(image))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Images.destroy({
    where: { id: req.params.id },
  })
    .then((image) => res.status(200).json(image))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
