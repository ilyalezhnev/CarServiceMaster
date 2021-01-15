const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const ServiceImage = db.serviceImage;

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  ServiceImage.findOne({
    where: {
      serviceId: req.body.serviceId,
      imageId: req.body.imageId,
    },
  })
    .then((item) => {
      if (!item) {
        return ServiceImage.create({
          serviceId: req.body.serviceId,
          imageId: req.body.imageId,
          type: req.body.type,
        }).then((serviceImage) => serviceImage);
      }
      throw new Error('Whoops!');
    })
    .then((serviceImage) => {
      return res.status(201).json(serviceImage);
    })
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  ServiceImage.destroy({
    where: { id: req.params.id },
  })
    .then((serviceImage) => res.status(200).json(serviceImage))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
