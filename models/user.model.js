module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    login: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });

  return User;
};
