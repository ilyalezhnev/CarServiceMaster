const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const db = require('../../models/index');
const Images = db.images;

const storage = multer.diskStorage({
  destination: './static/uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|svg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    return cb('Images only!');
  },
}).single('avatar');

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      Images.create({
        filename: req.file.filename,
        extension: path.extname(req.file.originalname).toLowerCase(),
        url: `/static/uploads/${req.file.filename}`,
      })
        .then((image) => res.status(201).json(image))
        .catch((err) => res.status(400).json(err));
    }
  });
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  let filePath = '';
  Images.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((image) => {
      filePath = path.resolve(`./static/uploads/${image.filename}`);
      return Images.destroy({
        where: { id: req.params.id },
      })
        .then((item) => {
          console.error(filePath);
          try {
            fs.unlinkSync(filePath);
          } catch (err) {
            console.error(err);
          }
          res.status(200).json(item);
        })
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
