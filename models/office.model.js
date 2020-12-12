module.exports = (sequelize, Sequelize) => {
  const Office = sequelize.define('office', {
    address: {
      type: Sequelize.TEXT('tiny'),
    },
    fullAddress: {
      type: Sequelize.TEXT('tiny'),
    },
    tel: {
      type: Sequelize.TEXT('tiny'),
    },
    fullTel: {
      type: Sequelize.TEXT('tiny'),
    },
    telegram: {
      type: Sequelize.TEXT('tiny'),
    },
    viber: {
      type: Sequelize.TEXT('tiny'),
    },
    whatsapp: {
      type: Sequelize.TEXT('tiny'),
    },
    whatsapp: {
      type: Sequelize.TEXT('tiny'),
    },
    description: {
      type: Sequelize.TEXT,
    },
    location: {
      type: Sequelize.TEXT('tiny'),
    },
    image: {
      type: Sequelize.TEXT('tiny'),
    },
  });

  return Office;
};
