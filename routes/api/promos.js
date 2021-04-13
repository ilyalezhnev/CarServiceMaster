const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const Promos = db.promos;

const promosController = require('../../controllers/promos.controller');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  promosController
    .getPromos()
    .then((promos) => {
      if (promos && !promos.length) {
        return res.status(200).json([]);
      }
      res.json(promos);
    })
    .catch((err) => res.status(404).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Promos.create({
    titleForMain: req.body.titleForMain,
    title: req.body.title,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    image: req.body.image,
  })
    .then((promo) => res.status(201).json(promo))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Promos.update(
    {
      titleForMain: req.body.titleForMain,
      title: req.body.title,
      description: req.body.description,
      shortDescription: req.body.shortDescription,
      image: req.body.image,
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
