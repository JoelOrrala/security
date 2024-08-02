var express = require("express");
var router = express.Router();
let crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels( sequelize ); 

router.get('/', async function (req, res, next) {
 
      try {
          let usersCollection = await models.users.findAll({
              include: { all: true, nested: true },
              raw: true,
              nest: true,
          });
          let rolesCollection = await models.roles.findAll({});
          
          // Generar el token JWT
          const token = jwt.sign({ username: req.session.username, role: 'user' }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            
            res.render('ticket', { username: req.session.username, title: 'token', usersArray: usersCollection, rolesArray: rolesCollection, jwtToken: token });
      } catch (error) {
          res.status(500).send(error);
      }

});

module.exports = router;