const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const CarPartsOffices = db.carPartOffice;

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  CarPartsOffices.findOne({
    where: {
      carPartId: req.body.carPartId,
      officeId: req.body.officeId,
    },
  })
    .then((item) => {
      if (!item) {
        return CarPartsOffices.create({
          carPartId: req.body.carPartId,
          officeId: req.body.officeId,
          description: req.body.description,
          image: req.body.image,
        }).then((carPart) => carPart);
      }
      throw new Error('Whoops!');
    })
    .then((carPart) => {
      return res.status(201).json(carPart);
    })
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  CarPartsOffices.update(
    {
      description: req.body.description,
      image: req.body.image,
    },
    { where: { id: req.params.id } }
  )
    .then((carPart) => res.status(200).json(carPart))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  CarPartsOffices.destroy({
    where: { id: req.params.id },
  })
    .then((carPartsOffices) => res.status(200).json(carPartsOffices))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
