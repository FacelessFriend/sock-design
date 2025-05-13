const SocksController = require('../../controllers/socksController');
const validateId = require('../../middlewares/validateId');
const verifyAccessToken = require('../../middlewares/verifyAccessToken');

const socksRouter = require('express').Router();

socksRouter.get('/', SocksController.getAllSocks);
socksRouter.get('/:id', validateId, SocksController.getSockById);
socksRouter.get('/user/:id', validateId, SocksController.getAllUsersSocks);
socksRouter.post('/', verifyAccessToken, SocksController.createSock);
socksRouter.put('/:id', validateId, verifyAccessToken, SocksController.updateSock);
socksRouter.delete('/:id', validateId, verifyAccessToken, SocksController.deleteSock);


module.exports = socksRouter;