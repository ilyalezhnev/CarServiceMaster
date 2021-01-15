const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const Promos = db.promos;
const Images = db.images;

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Promos.findAll({ include: Images })
    .then((promos) => {
      if (promos && !promos.length) {
        errors.nopromos = 'Нет акций';
        return res.status(404).json(errors);
      }
      res.json(promos);
    })
    .catch((err) => res.status(404).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Promos.create({
    title: req.body.title,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
  })
    .then((promo) => res.status(201).json(promo))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Promos.update(
    {
      title: req.body.title,
      description: req.body.description,
      shortDescription: req.body.shortDescription,
    },
    { where: { id: req.params.id } }
  )
    .then((promo) => res.status(200).json(promo))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Promos.destroy({
    where: { id: req.params.id },
  })
    .then((promo) => res.status(200).json(promo))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
