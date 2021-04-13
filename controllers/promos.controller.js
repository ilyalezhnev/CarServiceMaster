const db = require('../models/index');
const Promos = db.promos;

exports.getPromos = () => {
  return Promos.findAll();
};
