const router = require("express").Router();

const {getFavoritSock,postFavoritSock,deleteFavoritSock} = require("../../controllers/favoriteController")
const authMiddleware = require("../../middlewares/authMiddleware");

router.get('/:id',authMiddleware,getFavoritSock)//по id пользователя
router.post('/:id',authMiddleware,postFavoritSock)//передаем id пользователя через парамс остальное в теле
router.delete('/:id',authMiddleware,deleteFavoritSock)//передаем id лайка

module.exports = router;