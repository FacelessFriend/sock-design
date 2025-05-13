const ColorController = require('../../controllers/colorController');
const validateId = require('../../middlewares/validateId');

const colorRouter = require('express').Router();

colorRouter.get('/', ColorController.getAllColors);
colorRouter.get('/:id', validateId, ColorController.getColorById);

module.exports = colorRouter;
