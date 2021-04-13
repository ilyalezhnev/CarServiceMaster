const db = require('../models/index');
const Offices = db.offices;

exports.getOffices = () => {
  return Offices.findAll();
};
