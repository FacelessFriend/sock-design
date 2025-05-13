const {searchUserFavorite,postUserFavorite,deleteUserFavorite} = require("../services/...Service");

    const  getFavoritSock  = async (req,res,next) => {
      try{
        const { id } = req.params;

        const favorite = await searchUserFavorite(id)

        res.status(200).json(favorite)
      }catch(error){
        next(error)
      }
    }

    const  postFavoritSock  = async (req,res,next) => {
        try{
          const { id } = req.params;
          const { sock_id } = req.body; 
  
          const favorite = await postUserFavorite(id,sock_id)
          res.status(200).json(favorite)
        }catch(error){
          next(error)
        }
      }

      const  deleteFavoritSock  = async (req,res,next) => {
        try{
          const { id } = req.params;
  
          const favorite = await deleteUserFavorite(id)
  
          res.status(200).json(favorite)
        }catch(error){
          next(error)
        }
      }

    module.exports = {getFavoritSock,postFavoritSock,deleteFavoritSock}