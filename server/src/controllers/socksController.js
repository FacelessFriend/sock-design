const SocksService = require('../services/socksService');

class SocksController {
  static async getAllSocks(req, res) {
    try {
      const socks = await SocksService.findAllSocks();

      return res.status(200).json({
        message: 'Success',
        data: socks,
      });
    } catch ({ message }) {
      console.error('Getting socks controller error', message);
      res.status(500).json({
        message: 'Internal server error on getting socks',
        data: null,
      });
    }
  }

  static async getAllUsersSocks(req, res) {
    try {
      const id = req.validatedId;
      const userId = res.locals.user.id;

      if (id !== userId) {
        return res.status(409).json({
          message: 'Forbidden for this user',
          data: null,
        });
      }
      const socks = await SocksService.findAllSocksByUserId(userId);

      return res.status(200).json({
        message: 'Success',
        data: socks,
      });
    } catch ({ message }) {
      console.error("Getting user's socks controller error", message);
      res.status(500).json({
        message: "Internal server error on getting user's socks",
        data: null,
      });
    }
  }

  //мидлварку в роут не забыть
  static async getSockById(req, res) {
    try {
      const id = req.validatedId;
      const sock = await SocksService.findSocksById(id);

      if (!sock) {
        return res.status(400).json({
          message: 'Sock not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: sock,
      });
    } catch ({ message }) {
      console.error('Controller fetching sock error', message);

      return res.status(500).json({
        message: 'Internal server error on getting sock by id',
        data: null,
      });
    }
  }

  //id user res.locals из мидлварки на акцесс токен
  static async createSock(req, res) {
    try {
      const userId = res.locals.user.id;
      const { colorId, pictureId, patternId } = req.body;
      const newSock = await SocksService.createNewSocks({
        user_id: userId,
        color_id: colorId,
        picture_id: pictureId,
        pattern_id: patternId,
      });

      if (!newSock) {
        return res.status(400).json({
          message: 'Sock not create with invalid data',
          data: null,
        });
      }

      return res.status(201).json({
        message: 'Success',
        data: newSock,
      });
    } catch ({ message }) {
      console.log('Controller creating sock error', message);

      return res.status(500).json({
        message: 'Internal server error on creating sock',
        data: null,
      });
    }
  }
  //validateId
  static async deleteSock(req, res) {
    try {
      const userId = res.locals.user.id;
      const id = req.validatedId;
      const deletingSock = await SocksService.findSocksById(id);

      //тут лучше 403, но если он на рефреше, то нельзя, посмотреть в авторизации потом 403 или 401
      if (userId !== deletingSock.user_id) {
        return res.status(409).json({
          message: 'Forbidden for this user',
          data: null,
        });
      }

      const countDeleted = await SocksService.deleteSocksById(id);

      if (countDeleted < 1) {
        return res.status(400).json({
          message: 'Sock not found for deleting',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: countDeleted,
      });
    } catch ({ message }) {
      console.log('Controller deleting sock error', message);

      return res.status(500).json({
        message: 'Internal server error on deleting sock',
        data: null,
      });
    }
  }

  static async updateSock(req, res) {
    try {
      const userId = res.locals.user.id;
      const id = req.validatedId;
      const updatingSock = await SocksService.findSocksById(id);
      if (userId !== updatingSock.user_id) {
        return res.status(401).json({
          message: 'Forbidden for this user',
          data: null,
        });
      }
      const { colorId, pictureId, patternId } = req.body;

      const changedSock = await SocksService.updateSocksById(id, {
        user_id: userId,
        color_id: colorId,
        picture_id: pictureId,
        pattern_id: patternId,
      });

      if (!changedSock) {
        return res.status(404).json({
          message: 'Sock not update',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: changedSock,
      });
    } catch ({ message }) {
      console.log('Controller updating sock error', message);

      return res.status(500).json({
        message: 'Internal server error while updating sock',
        data: null,
      });
    }
  }
}

module.exports = SocksController;
