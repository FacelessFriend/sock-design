const {Favorite} = require("../../db/models");

const searchUserFavorite = async (userId) => {
    const data = await Favorite.findAll({
        where: { user_id: +userId },
        include: [
            {
                model: Sock,
                as: 'sock',
                include: [
                    {
                        model: Color,
                        as: 'Color'
                    },
                    {
                        model: Picture,
                        as: 'Picture'
                    },
                    {
                        model: Pattern,
                        as: 'Pattern'
                    }
                ]
            }
        ]
    });
    return data;
};
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