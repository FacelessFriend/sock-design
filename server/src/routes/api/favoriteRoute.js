const favoriteRouter = require('express').Router();

const {
  getFavoritSock,
  postFavoritSock,
  deleteFavoritSock,
} = require('../../controllers/favoriteController');
const authMiddleware = require('../../middlewares/authMiddleware');

favoriteRouter.get('/:id', authMiddleware, getFavoritSock); //по id пользователя
favoriteRouter.post('/:id', authMiddleware,  postFavoritSock); //передаем id пользователя через парамс остальное в теле
favoriteRouter.delete('/:id', authMiddleware, deleteFavoritSock); //передаем id лайка

module.exports = favoriteRouter;
