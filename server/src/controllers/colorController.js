const ColorService = require('../services/colorService');

class ColorController {
  static async getAllColors(req, res) {
    try {
      const colors = await ColorService.findAllColors();

      return res.status(200).json({
        message: 'Success',
        data: colors,
      });
    } catch ({ message }) {
      console.error('Getting colors controller error', message);
      res.status(500).json({
        message: 'Internal server error on getting colors',
        data: null,
      });
    }
  }

  static async getColorById(req, res) {
    try {
      const id = req.validatedId;

      const color = await ColorService.findColorById(id);

      if (!color) {
        return res.status(400).json({
          message: 'Color not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: color,
      });
    } catch ({ message }) {
      console.error('Controller fetching color error', message);

      return res.status(500).json({
        message: 'Internal server error on getting color by id',
        data: null,
      });
    }
  }
}

module.exports = ColorController;
