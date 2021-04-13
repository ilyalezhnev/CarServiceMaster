const db = require('../models/index');
const Reviews = db.reviews;

exports.getReviews = () => {
  return Reviews.findAll();
};
