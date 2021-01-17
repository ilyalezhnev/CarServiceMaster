module.exports = (sequelize, Sequelize) => {
  const ServiceOffice = sequelize.define('serviceOffice', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    isAvailable: {
      type: Sequelize.BOOLEAN,
    },
  });

  return ServiceOffice;
};
