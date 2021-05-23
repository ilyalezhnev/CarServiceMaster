const servicesController = require('../controllers/services.controller');
const officesController = require('../controllers/offices.controller');
const promoController = require('../controllers/promos.controller');
const carPartsController = require('../controllers/carParts.controller');
const corporateClientsController = require('../controllers/corporateClients.controller');
const marked = require('marked');

exports.getMappedServices = async () => {
  const services = await servicesController.getServices();
  return services.map((it) => {
    const { id, title, icon } = it;
    return {
      id,
      title,
      icon,
    };
  });
};

exports.getMappedOffices = async () => {
  const offices = await officesController.getOffices();
  return offices.map((it) => {
    const { dataValues } = it;
    const { tel, address, fullTel, fullAddress, workingHours } = dataValues;

    return {
      address,
      fullAddress,
      tel,
      fullTel,
      workingHours,
    };
  });
};

exports.getMappedPromos = async () => {
  const promos = await promoController.getPromos();

  promos.map((it) => {
    it.titleForMain = marked(it.titleForMain);
  });

  return promos;
};

exports.getMappedCarParts = async () => {
  const carParts = await carPartsController.getCarParts();
  const { dataValues } = carParts;
  const { title, subtitle, offices } = dataValues;

  offices.map((it) => {
    return it.dataValues;
  });

  return { title, subtitle, offices };
};

exports.getCorporateClients = async () => {
  const corporateClients = await corporateClientsController.getCorporateClients();
  corporateClients.description = marked(corporateClients.description);
  corporateClients.info = marked(corporateClients.info);

  return corporateClients;
};
