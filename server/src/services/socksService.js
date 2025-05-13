const { Sock, User } = require('../../../db/models');

class SocksService {
  static async findAllSocksByUserId(userId) {
    return await Sock.findAll({
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

  static async findAllSocks() {
    return await Sock.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  static async findSocksById(id) {
    return await Sock.findByPk(id);
  }

  static async createNewSocks(dataSocks) {
    return await Sock.create(dataSocks);
  }

  static async deleteSoksById(id) {
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
