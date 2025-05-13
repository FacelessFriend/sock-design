const {Favorite} = require("../../db/models");

const searchUserFavorite = async (id) => {
    const data = await Favorite.findAll({
        where: { id: +id},
        include: [
            {
                model: Sock,
                as: 'sock',
            }
        ]
    })

    return data
}
const postUserFavorite = async (userId, sockId) => {
    const favorite = await Favorite.create({
        user_id: userId,
        sock_id: sockId
    });
    return favorite;
}

const deleteUserFavorite = async (favoriteId) => {
    const deleted = await Favorite.destroy({
        where: { id: favoriteId }
    });
    return deleted;
}

module.exports = { searchUserFavorite, postUserFavorite, deleteUserFavorite };