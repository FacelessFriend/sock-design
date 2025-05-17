const BasketController = require('../../controllers/basketController');
const validateId = require('../../middlewares/validateId');
const authMiddleware = require('../../middlewares/authMiddleware');

const basketRouter = require('express').Router();

basketRouter.get('/', BasketController.getAllBaskets);
basketRouter.get('/:id', validateId, BasketController.getBasketById);
//ок ли эндпоинт
basketRouter.get(
  //правка
  '/user/:id',
  // '/user',
  validateId,
  authMiddleware,
  BasketController.getAllUsersBaskets
);
basketRouter.post('/', authMiddleware, BasketController.createBasket);
basketRouter.put(
  '/:id',
  validateId,
  authMiddleware,
  BasketController.updateBasket
);
basketRouter.delete(
  '/:id',
  validateId,
  authMiddleware,
  BasketController.deleteBasket
);

module.exports = basketRouter;
