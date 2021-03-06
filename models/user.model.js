module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    login: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false,
    },
    password: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false,
    },
  });

  return User;
};
