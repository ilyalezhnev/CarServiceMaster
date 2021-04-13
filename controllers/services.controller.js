const db = require('../models/index');
const Services = db.services;
const Offices = db.offices;

exports.getServices = () => {
  return Services.findAll({ include: Offices });
};
exports.getService = (id) => {
  return Services.findOne({ where: { id }, include: [Offices] });
};
