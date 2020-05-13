var express = require('express');
var router = express.Router();
const path = require("path");
var controller = require('../controller/controller');

/* GET home page. */
router.get('/', controller.showIndex);
router.get('/new', controller.createNewNote);
router.post('/new', controller.saveNewNote);
router.get('/edit/:id', controller.editNote);
router.post('/edit/:id', controller.updateNote);

module.exports = router;
