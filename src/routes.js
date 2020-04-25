const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const FileController = require('./app/controllers/FileController');
const SessionController = require('./app/controllers/SessionController');

const multer = require('multer');
const multerconfig = require('./config/multer');
const upload = multer(multerconfig);

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

routes.delete('/users/:id', UserController.destroy);

routes.get('/users', UserController.index);

routes.post('/files', upload.single('file'), FileController.store);

module.exports = routes;