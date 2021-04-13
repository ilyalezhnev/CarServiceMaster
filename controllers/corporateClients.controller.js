const db = require('../models/index');
const CorporateClients = db.corporateClients;
const Images = db.images;

exports.getCorporateClients = () => {
  return CorporateClients.findOne({ include: Images });
};
