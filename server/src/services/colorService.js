const { Color } = require('../../../db/models');

class ColorService {
  static async findAllColors() {
    return await Color.findAll();
  }

  static async findColorById(id) {
    return await Color.findByPk(id);
  }
}

module.exports = ColorService;
