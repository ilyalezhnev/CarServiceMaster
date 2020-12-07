const db = require('../models/index');
const User = db.users;
const bcrypt = require('bcryptjs');

exports.adminSeeder = () => {
  User.findOne({ where: { login: 'admin' } })
    .then((user) => {
      if (user) {
        console.log('Admin already exist');
      } else {
        const admin = {
          login: 'admin',
          password: '123456',
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(admin.password, salt, (err, hash) => {
            if (err) throw err;

            User.create({
              login: admin.login,
              password: hash,
            })
              .then(console.log('Admin was created successfully'))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log('finding error', err));
};
