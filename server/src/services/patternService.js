const { Pattern } = require('../../../db/models');

class PatternService {
  static async findAllPatterns() {
    return await Pattern.findAll();
  }

  static async findPatternById(id) {
    return await Pattern.findByPk(id);
  }
}

module.exports = PatternService;
