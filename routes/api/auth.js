const express = require('express');
const router = express.Router();
const db = require('../../models/index');
const User = db.users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
// const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// User register
// router.post('/register/user', (req, res) => {
//   const { errors, isValid } = validateRegisterInput(req.body);

//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   User.findOne({ where: { login: req.body.login } }).then((user) => {
//     if (user) {
//       errors.login = 'Имя уже используется';
//       return res.status(400).json(errors);
//     } else {
//       const newUser = new User({
//         login: req.body.login,
//         password: req.body.password,
//       });

//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) throw err;
//           newUser.password = hash;
//           newUser
//             .save()
//             .then((user) => res.json(user))
//             .catch((err) => console.log(err));
//         });
//       });
//     }
//   });
// });

// User login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(422).json(errors);
  }

  const login = req.body.login;
  const password = req.body.password;

  User.findOne({ where: { login } }).then((user) => {
    if (!user) {
      errors.error = 'Некорректные авторизационные данные';
      return res.status(422).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, login: user.login };
        jwt.sign(payload, keys.secretOrKey, { expiresIn: '10h' }, (err, token) => {
          res.json({
            succces: true,
            token: 'Bearer ' + token,
          });
        });
      } else {
        errors.error = 'Некорректные авторизационные данные';
        return res.status(422).json(errors);
      }
    });
  });
});

module.exports = router;
