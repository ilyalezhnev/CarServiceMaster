const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const Offices = db.offices;

const officesController = require('../../controllers/offices.controller');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  officesController
    .getOffices()
    .then((offices) => {
      if (offices && !offices.length) {
        return res.status(200).json([]);
      }
      res.json(offices);
    })
    .catch((err) => res.status(404).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Offices.create({
    address: req.body.address,
    fullAddress: req.body.fullAddress,
    tel: req.body.tel,
    fullTel: req.body.fullTel,
    telegram: req.body.telegram,
    viber: req.body.viber,
    whatsapp: req.body.whatsapp,
    email: req.body.email,
    description: req.body.description,
    locationLat: req.body.locationLat,
    locationLon: req.body.locationLon,
    workingHours: req.body.workingHours,
  })
    .then((office) => res.status(201).json(office))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Offices.update(
    {
      address: req.body.address,
      fullAddress: req.body.fullAddress,
      tel: req.body.tel,
      fullTel: req.body.fullTel,
      telegram: req.body.telegram,
      viber: req.body.viber,
      whatsapp: req.body.whatsapp,
      email: req.body.email,
      description: req.body.description,
      locationLat: req.body.locationLat,
      locationLon: req.body.locationLon,
      workingHours: req.body.workingHours,
    },
    { where: { id: req.params.id } }
  )
    .then((office) => res.status(200).json(office))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Offices.destroy({
    where: { id: req.params.id },
  })
    .then((office) => res.status(200).json(office))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
