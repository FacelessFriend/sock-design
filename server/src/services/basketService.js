const { Basket, User } = require('../../db/models');

class BasketService {
  static async findAllBasketsByUserId(userId) {
    return await Basket.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          attributes: ['id', 'email'], //email особо и не нужен
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  static async findAllBaskets() {
    return await Basket.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  static async findBasketById(id) {
    return await Basket.findByPk(id);
  }

  static async createNewBasket(dataBasket) {
    return await Basket.create(dataBasket);
  }

  static async deleteBasketById(id) {
    return await Basket.destroy({ where: { id } });
  }

  static async updateBasketById(id, dataBasket) {
    const updatedBasket = await Basket.update(dataBasket, {
      where: { id },
    });

    if (updatedBasket[0] === 0) {
      return null;
    }
    const basket = await BasketService.findBasketById(id);

    return basket.get({ plain: true });
  }
}

module.exports = BasketService;
