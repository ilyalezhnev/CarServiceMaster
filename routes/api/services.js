const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const Services = db.services;
const Offices = db.offices;
const Images = db.images;

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Services.findAll({ include: Images })
    .then((services) => {
      if (services && !services.length) {
        errors.noservices = 'Нет услуг';
        return res.status(404).json(errors);
      }
      res.json(services);
    })
    .catch((err) => res.status(404).json(err));
});
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Services.findOne({ where: { id: req.params.id }, include: [Offices, Images] })
    .then((service) => {
      if (!service) {
        errors.noservices = 'Нет услуги';
        return res.status(404).json(errors);
      }
      res.json(service);
    })
    .catch((err) => res.status(404).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Services.create({
    title: req.body.title,
    description: req.body.description,
    text: req.body.text,
  })
    .then((service) => res.status(201).json(service))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Services.update(
    {
      title: req.body.title,
      description: req.body.description,
      text: req.body.text,
    },
    { where: { id: req.params.id } }
  )
    .then((service) => res.status(200).json(service))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Services.destroy({
    where: { id: req.params.id },
  })
    .then((service) => res.status(200).json(service))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
