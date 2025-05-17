const PictureController = require('../../controllers/pictureController');
const validateId = require('../../middlewares/validateId');


const pictureRouter = require('express').Router();

pictureRouter.get('/', PictureController.getAllPictures);
pictureRouter.get('/:id', validateId, PictureController.getPictureById);

module.exports = pictureRouter;
