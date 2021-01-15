const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const CorporateClientImage = db.corporateClientImage;

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  CorporateClientImage.findOne({
    where: {
      corporateClientId: req.body.corporateClientId,
      imageId: req.body.imageId,
    },
  })
    .then((item) => {
      if (!item) {
        return CorporateClientImage.create({
          corporateClientId: req.body.corporateClientId,
          imageId: req.body.imageId,
        }).then((corporateClientImage) => corporateClientImage);
      }
      throw new Error('Whoops!');
    })
    .then((corporateClientImage) => {
      return res.status(201).json(corporateClientImage);
    })
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  CorporateClientImage.destroy({
    where: { id: req.params.id },
  })
    .then((corporateClientImage) => res.status(200).json(corporateClientImage))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
