const db = require('../models/index');
const Services = db.services;
const Offices = db.offices;

exports.services = {
  getAll: () => {
    Services.findAll({ include: Offices })
      .then((services) => {
        if (services && !services.length) {
          return res.status(200).json([]);
        }
        res.json(services);
      })
      .catch((err) => res.status(404).json(err));
  },
  getSingle: (id) => {},
};
