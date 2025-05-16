const {
  Basket,
  User,
  Sock,
  Color,
  Pattern,
  Picture,
} = require('../../db/models');

class BasketService {
  static async findAllBasketsByUserId(userId) {
    return await Basket.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          attributes: ['id', 'email'], //email особо и не нужен
        },
        {
          model: Sock,
          include: [
            {
              model: Color,
              attributes: ['code', 'color'],
            },
            {
              model: Pattern,
              attributes: ['pattern', 'pattern_url'],
            },
            {
              model: Picture,
              attributes: ['picture_url', 'picture'],
            },
          ],
          attributes: ['id', 'user_id', 'color_id', 'picture_id', 'pattern_id'],
        },
      ],
      attributes: ['user_id', 'socks_id', 'quantity'],
      order: [['createdAt', 'DESC']],
    });
  }

  //пока не актуален
  static async findAllBaskets() {
    return await Basket.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  static async findBasketById(id) {
    return await Basket.findByPk(id, {
      include: [
        {
          model: Sock,
          include: [
            {
              model: Color,
              attributes: ['code', 'color'],
            },
            {
              model: Pattern,
              attributes: ['pattern', 'pattern_url'],
            },
            {
              model: Picture,
              attributes: ['picture_url', 'picture'],
            },
          ],
          attributes: ['user_id', 'color_id', 'picture_id', 'pattern_id'],
        },
      ],
    });
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
