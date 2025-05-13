const BasketController = require('../../controllers/basketController');
const validateId = require('../../middlewares/validateId');
const verifyAccessToken = require('../../middlewares/verifyAccessToken');

const basketRouter = require('express').Router();

basketRouter.get('/', BasketController.findAllBaskets);
basketRouter.get('/:id', validateId, BasketController.getBasketById);
//ок ли эндпоинт
basketRouter.get(
  '/user/:id',
  validateId,
  verifyAccessToken,
  BasketController.getAllUsersBaskets
);
basketRouter.post('/', verifyAccessToken, BasketController.createBasket);
basketRouter.put(
  '/:id',
  validateId,
  verifyAccessToken,
  BasketController.updateBasket
);
basketRouter.delete(
  '/:id',
  validateId,
  verifyAccessToken,
  BasketController.deleteBasket
);

module.exports = basketRouter;
