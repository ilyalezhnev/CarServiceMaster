const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const CarParts = db.carParts;
const Offices = db.offices;

const carPartsController = require('../../controllers/carParts.controller');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  carPartsController
    .getCarParts()
    .then((carParts) => {
      if (!carParts) {
        return res.status(200).json(null);
      }
      res.json(carParts);
    })
    .catch((err) => res.status(404).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  CarParts.findOne()
    .then((carParts) => {
      if (!carParts) {
        return CarParts.create({
          title: req.body.title,
          subtitle: req.body.subtitle,
        }).then((carPart) => carPart);
      }
      throw new Error('Whoops!');
    })
    .then((carPart) => res.status(201).json(carPart))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  CarParts.update(
    {
      title: req.body.title,
      subtitle: req.body.subtitle,
    },
    { where: { id: req.params.id }, returning: true, plain: true }
  )
    .then(() => {
      return CarParts.findOne().then((carPart) => carPart);
    })
    .then((carPart) => res.status(201).json(carPart))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
