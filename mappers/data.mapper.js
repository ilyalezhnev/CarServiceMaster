const servicesController = require('../controllers/services.controller');
const officesController = require('../controllers/offices.controller');

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
