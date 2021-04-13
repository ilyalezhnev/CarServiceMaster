const db = require('../models/index');
const CarParts = db.carParts;
const Offices = db.offices;

exports.getCarParts = () => {
  return CarParts.findOne({ include: Offices });
};
