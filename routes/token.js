var express = require("express");
var router = express.Router();

let crypto = require('crypto');

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels( sequelize );  

/* GET users listing. */
 /* 2. Convierta el callback en asíncrono */
 router.get('/', async function(req, res, next) {

    /* 3. Uso del método findAll */
    let usersCollection = await models.users.findAll({ 
  
      /* 3.1. Including everything */
      include: { all: true, nested: true },
         
      /* 3.2. Raw Queries */
      raw: true,
      nest: true,
         
         
      })
    let rolesCollection = await models.roles.findAll({ })
    /* 4. Paso de parámetros a la vista */
    res.render('ticket', { username: req.cookies['username'], title: 'token', usersArray: usersCollection, rolesArray: rolesCollection   });
  
  });

module.exports = router;