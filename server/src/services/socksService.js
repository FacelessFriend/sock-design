const { Sock, User, Color, Pattern, Picture, Favorite } = require('../../db/models');

class SocksService {
  static async findAllSocksByUserId(userId) {
    return await Sock.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          attributes: ['id', 'name']
        },
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
      order: [['createdAt', 'DESC']],
    });
  }

  static async findAllSocks() {
    return await Sock.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  static async findSocksById(id) {
    return await Sock.findByPk(id, {
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
    });
  }

  static async createNewSocks(dataSocks) {
    return await Sock.create(dataSocks);
  }

  static async deleteSocksById(id) {
    return await Sock.destroy({ where: { id } });
  }

  static async updateSocksById(id, dataSocks) {
    const updatedSocks = await Sock.update(dataSocks, {
      where: { id },
    });

    if (updatedSocks[0] === 0) {
      return null;
    }
    const socks = await SocksService.findSocksById(id);

    return socks.get({ plain: true });
  }
}

module.exports = SocksService;
