const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const Reviews = db.reviews;

const reviewsController = require('../../controllers/reviews.controller');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  reviewsController
    .getReviews()
    .then((reviews) => {
      if (reviews && !reviews.length) {
        return res.status(200).json([]);
      }
      res.json(reviews);
    })
    .catch((err) => res.status(404).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Reviews.create({
    fullName: req.body.fullName,
    text: req.body.text,
    image: req.body.image,
  })
    .then((review) => res.status(201).json(review))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Reviews.update(
    {
      fullName: req.body.fullName,
      text: req.body.text,
      image: req.body.image,
    },
    { where: { id: req.params.id } }
  )
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Reviews.destroy({
    where: { id: req.params.id },
  })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
