const SocksController = require('../../controllers/socksController');
const validateId = require('../../middlewares/validateId');
const authMiddleware = require('../../middlewares/authMiddleware');

const socksRouter = require('express').Router();

socksRouter.get('/', SocksController.getAllSocks);
socksRouter.get('/:id',  SocksController.getSockById);
// socksRouter.get('/:id', validateId, SocksController.getSockById);
//ок ли эндпоинт
socksRouter.get(
  '/user/:id',
  validateId,
  authMiddleware,
  SocksController.getAllUsersSocks
);
socksRouter.post('/', authMiddleware, SocksController.createSock);
socksRouter.put('/:id', validateId, authMiddleware, SocksController.updateSock);
socksRouter.delete(
  '/:id',
  validateId,
  authMiddleware,
  SocksController.deleteSock
);

module.exports = socksRouter;
