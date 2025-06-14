const BasketService = require('../services/basketService');

class BasketController {
  static async getAllBaskets(_, res) {
    try {
      const baskets = await BasketService.findAllBaskets();

      return res.status(200).json({
        message: 'Success',
        data: baskets,
      });
    } catch ({ message }) {
      console.error('Getting baskets controller error', message);
      res.status(500).json({
        message: 'Internal server error on getting baskets',
        data: null,
      });
    }
  }

  //на время отладки без авторизации - потом раскомментировать и вернуть мидлварку
  static async getAllUsersBaskets(req, res) {
    try {
      // правка
      const id = req.validatedId;
      // console.log('id server', id);

      const userId = res.locals.user.id;

      if (userId !== id) {
        return res.status(403).json({
          message: 'Forbidden for this user',
          data: null,
        });
      }
      // const baskets = await BasketService.findAllBasketsByUserId(id); //убрать потом
      const baskets = await BasketService.findAllBasketsByUserId(userId);

      return res.status(200).json({
        message: 'Success',
        data: baskets,
      });
    } catch (e) {
      console.error("Getting user's baskets controller error", e);
      res.status(500).json({
        message: "Internal server error on getting user's baskets",
        data: null,
      });
    }
  }

  //мидлварку в роут не забыть
  static async getBasketById(req, res) {
    try {
      const id = req.validatedId;
      const basket = await BasketService.findBasketById(id);

      if (!basket) {
        return res.status(400).json({
          message: 'Basket not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: basket,
      });
    } catch ({ message }) {
      console.error('Controller fetching basket error', message);

      return res.status(500).json({
        message: 'Internal server error on getting basket by id',
        data: null,
      });
    }
  }

  //id user res.locals из мидлварки на акцесс токен
  static async createBasket(req, res) {
    try {
      const userId = res.locals.user.id;
      const { sockId, quantity } = req.body;

      console.log(userId,sockId, quantity);
      

      const newBasket = await BasketService.createNewBasket({
        user_id: userId,
        socks_id: +sockId,
        quantity: isNaN(+quantity) ? 1 : +quantity,
      });

      if (!newBasket) {
        return res.status(400).json({
          message: 'New basket not create with invalid data',
          data: null,
        });
      }

      return res.status(201).json({
        message: 'Success',
        data: newBasket,
      });
    } catch ({ message }) {
      console.log('Controller creating basket error', message);

      return res.status(500).json({
        message: 'Internal server error on creating basket',
        data: null,
      });
    }
  }
  //validateId
  static async deleteBasket(req, res) {
    try {
      const userId = res.locals.user.id;
      const id = req.validatedId;
      const deletingBasket = await BasketService.findBasketById(id);

      if (userId !== deletingBasket.user_id) {
        return res.status(403).json({
          message: 'Forbidden for this user',
          data: null,
        });
      }

      const countDeleted = await BasketService.deleteBasketById(id);

      if (countDeleted < 1) {
        return res.status(400).json({
          message: 'Basket not found for deleting',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: countDeleted,
      });
    } catch ({ message }) {
      console.log('Controller deleting basket error', message);

      return res.status(500).json({
        message: 'Internal server error on deleting basket',
        data: null,
      });
    }
  }

  static async updateBasket(req, res) {
    try {
      const userId = res.locals.user.id;
      const id = req.validatedId;
      const updatingBasket = await BasketService.findBasketById(id);
      if (userId !== updatingBasket.user_id) {
        return res.status(401).json({
          message: 'Forbidden for this user',
          data: null,
        });
      }
      const { sockId, quantity, status } = req.body;

      const changedBasket = await BasketService.updateBasketById(id, {
        user_id: userId,
        socks_id: +sockId,
        quantity: isNaN(+quantity) ? 1 : +quantity,
        status,
      });

      if (!changedBasket) {
        return res.status(404).json({
          message: 'Basket not update',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: changedBasket,
      });
    } catch ({ message }) {
      console.log('Controller updating basket error', message);

      return res.status(500).json({
        message: 'Internal server error while updating basket',
        data: null,
      });
    }
  }
}

module.exports = BasketController;
