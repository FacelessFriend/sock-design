const {Favorite,Sock,Pattern,Color,Picture} = require("../../db/models");

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
    const existingFavorite = await Favorite.findOne({
        where: {
            user_id: userId,
            socks_id: sockId
        }
    });

    if (existingFavorite) {
        throw new Error('Этот носок уже в избранном');
    }

    const favorite = await Favorite.create({
        user_id: userId,
        socks_id: sockId
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