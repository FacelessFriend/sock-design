const PatternService = require('../services/patternService');

class PatternController {
  static async getAllPatterns(req, res) {
    try {
      const patterns = await PatternService.findAllPatterns();

      return res.status(200).json({
        message: 'Success',
        data: patterns,
      });
    } catch ({ message }) {
      console.error('Getting patterns controller error', message);
      res.status(500).json({
        message: 'Internal server error on getting patterns',
        data: null,
      });
    }
  }

  static async getPatternById(req, res) {
    try {
      const id = req.validatedId;

      const pattern = await PatternService.findPatternById(id);

      if (!pattern) {
        return res.status(400).json({
          message: 'Pattern not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: pattern,
      });
    } catch ({ message }) {
      console.error('Controller fetching pattern error', message);

      return res.status(500).json({
        message: 'Internal server error on getting pattern by id',
        data: null,
      });
    }
  }
}

module.exports = PatternController;
