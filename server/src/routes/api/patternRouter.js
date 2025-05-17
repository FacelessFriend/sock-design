const PatternController = require('../../controllers/patternController');
const validateId = require('../../middlewares/validateId');
const authMiddleware = require('../../middlewares/authMiddleware');

const patternRouter = require('express').Router();

patternRouter.get('/', PatternController.getAllPatterns);
patternRouter.get('/:id', validateId, PatternController.getPatternById);

module.exports = patternRouter;
