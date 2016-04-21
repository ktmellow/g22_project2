const express = require("express");
const router = express.Router()
const knex = require("../db/knex");

router.get('/', function(req,res){
    knex('users').then((users) => {
      res.render('users/index', {users});
    })
});

module.exports = router;