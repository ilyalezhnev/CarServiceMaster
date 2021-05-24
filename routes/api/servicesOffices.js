const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const ServiceOffice = db.serviceOffice;

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  ServiceOffice.findOne({
    where: {
      serviceId: req.body.serviceId,
      officeId: req.body.officeId,
    },
  })
    .then((item) => {
      if (!item) {
        return ServiceOffice.create({
          serviceId: req.body.serviceId,
          officeId: req.body.officeId,
          isAvailable: !!req.body.isAvailable,
        }).then((serviceOffice) => serviceOffice);
      }
      throw new Error('Whoops!');
    })
    .then((serviceOffice) => {
      return res.status(201).json(serviceOffice);
    })
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  ServiceOffice.update(
    {
      serviceId: req.body.serviceId,
      officeId: req.body.officeId,
      isAvailable: !!req.body.isAvailable,
    },
    { where: { id: req.params.id }, returning: true, plain: true }
  )
    .then(() => {
      return ServiceOffice.findOne({
        where: { id: req.params.id },
      }).then((serviceOffice) => serviceOffice);
    })
    .then((serviceOffice) => {
      return res.status(200).json(serviceOffice);
    })
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  ServiceOffice.destroy({
    where: { id: req.params.id },
  })
    .then((serviceOffice) => res.status(200).json(serviceOffice))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
