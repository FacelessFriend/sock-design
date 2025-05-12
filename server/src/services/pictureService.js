const { Picture } = require('../../../db/models');

class PatternService {
  static async findAllPictures() {
    return await Picture.findAll();
  }

  static async findPictureById(id) {
    return await Picture.findByPk(id);
  }
}

module.exports = PatternService;