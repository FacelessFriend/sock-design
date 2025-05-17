const PictureService = require('../services/pictureService');

class PictureController {
  static async getAllPictures(req, res) {
    try {
      const pictures = await PictureService.findAllPictures();

      return res.status(200).json({
        message: 'Success',
        data: pictures,
      });
    } catch ({ message }) {
      console.error('Getting pictures controller error', message);
      res.status(500).json({
        message: 'Internal server error on getting pictures',
        data: null,
      });
    }
  }

  static async getPictureById(req, res) {
    try {
      const id = req.validatedId;

      const picture = await PictureService.findPictureById(id);

      if (!picture) {
        return res.status(400).json({
          message: 'Picture not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: picture,
      });
    } catch ({ message }) {
      console.error('Controller fetching picture error', message);

      return res.status(500).json({
        message: 'Internal server error on getting picture by id',
        data: null,
      });
    }
  }
}

module.exports = PictureController;
