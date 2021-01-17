const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const PromosImages = db.promoImage;

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  PromosImages.findOne({
    where: {
      promoId: req.body.promoId,
      imageId: req.body.imageId,
    },
  })
    .then((item) => {
      if (!item) {
        return PromosImages.create({
          promoId: req.body.promoId,
          imageId: req.body.imageId,
        }).then((promosImage) => promosImage);
      }
      throw new Error('Whoops!');
    })
    .then((promosImage) => {
      return res.status(201).json(promosImage);
    })
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  PromosImages.destroy({
    where: { id: req.params.id },
  })
    .then((promosImage) => res.status(200).json(promosImage))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
