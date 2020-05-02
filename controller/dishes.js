const Dishes = require('../models/Dishes');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
/**
 * @params req, res, next
 * @description Get All dishes from database
 * @route GET   /chefonline/v1/dishes
 * @access Public
 */
exports.getDishes = asyncHandler(async (req, res, next) => {
    const dishes = await Dishes.find();

    res.status(200).json({
        success: true,
        count: dishes.length,
        data: dishes,
    });
});

/**
 * @params req, res, next
 * @description Get single dishes from database
 * @route GET   /chefonline/v1/dishes/:id
 * @access Public
 */
exports.getDish = asyncHandler(async (req, res, next) => {
    const dish = await Dishes.findById(req.params.id);
    if (!dish) {
        return next(
            new ErrorResponse(`No dish found with id ${req.params.id}`, 404)
        );
    }
    res.status(200).json({
        success: true,
        data: dish,
    });
});

/**
 * @params req, res, next
 * @description Add a dish to database
 * @route POST   /chefonline/v1/dishes
 * @access Private
 */
exports.createDish = asyncHandler(async (req, res, next) => {
    const dish = await Dishes.create(req.body);
    res.status(200).json({
        success: true,
        data: dish,
    });
});

/**
 * @params req, res, next
 * @description Update single dish in database
 * @route PUT   /chefonline/v1/dishes/:id
 * @access Public
 */
exports.updateDish = asyncHandler(async (req, res, next) => {
    const dish = await Dishes.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!dish) {
        return next(
            new ErrorResponse(`No dish found with id ${req.params.id}`, 404)
        );
    }
    res.status(200).json({
        success: true,
        data: dish,
    });
});

/**
 * @params req, res, next
 * @description Delete single dish in database
 * @route DELETE   /chefonline/v1/dishes/:id
 * @access Public
 */
exports.deleteDish = asyncHandler(async (req, res, next) => {
    const dish = await Dishes.findByIdAndDelete(req.params.id);
    if (!dish) {
        return next(
            new ErrorResponse(`No dish found with id ${req.params.id}`, 404)
        );
    }
    res.status(200).json({
        success: true,
        deletedData: dish,
    });
});
