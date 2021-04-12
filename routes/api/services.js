const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const Services = db.services;
const Offices = db.offices;

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Services.findAll({ include: Offices })
    .then((services) => {
      if (services && !services.length) {
        return res.status(200).json([]);
      }
      res.json(services);
    })
    .catch((err) => res.status(404).json(err));
});
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Services.findOne({ where: { id: req.params.id }, include: [Offices] })
    .then((service) => {
      if (!service) {
        return res.status(200).json(null);
      }
      res.json(service);
    })
    .catch((err) => res.status(404).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Services.create({
    title: req.body.title,
    cost: req.body.cost,
    description: req.body.description,
    text: req.body.text,
    image: req.body.image,
    icon: req.body.icon,
  })
    .then((service) => res.status(201).json(service))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Services.update(
    {
      title: req.body.title,
      cost: req.body.cost,
      description: req.body.description,
      text: req.body.text,
      image: req.body.image,
      icon: req.body.icon,
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
