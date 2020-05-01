const Dishes = require('../models/Dishes');
/**
 * @params req, res, next
 * @description Get All dishes from database
 * @route GET   /chefonline/v1/dishes
 * @access Public
 */
exports.getDishes = async (req, res, next) => {
    try {
        const dishes = await Dishes.find();
        if (!dishes) {
            return res.status(400).json({
                success: false,
                count: dishes.length,
                data: 'No dish found',
            });
        }
        res.status(200).json({
            success: true,
            data: dishes,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: 'Bad Request',
        });
    }
};

/**
 * @params req, res, next
 * @description Get single dishes from database
 * @route GET   /chefonline/v1/dishes/:id
 * @access Public
 */
exports.getDish = async (req, res, next) => {
    try {
        const dish = await Dishes.findById(req.params.id);
        if (!dish) {
            return res.status(400).json({
                success: false,
                data: 'No dish found',
            });
        }
        res.status(200).json({
            success: true,
            data: dish,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: 'Bad Request',
        });
    }
};

/**
 * @params req, res, next
 * @description Add a dish to database
 * @route POST   /chefonline/v1/dishes
 * @access Private
 */
exports.createDish = async (req, res, next) => {
    try {
        const dish = await Dishes.create(req.body);
        res.status(200).json({
            success: true,
            data: dish,
        });
    } catch (error) {}
};

/**
 * @params req, res, next
 * @description Update single dish in database
 * @route PUT   /chefonline/v1/dishes/:id
 * @access Public
 */
exports.updateDish = async (req, res, next) => {
    try {
        const dish = await Dishes.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!dish) {
            return res.status(400).json({
                success: false,
                data: 'No dish found',
            });
        }
        res.status(200).json({
            success: true,
            data: dish,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: 'Bad Request',
        });
    }
};

/**
 * @params req, res, next
 * @description Delete single dish in database
 * @route DELETE   /chefonline/v1/dishes/:id
 * @access Public
 */
exports.deleteDish = async (req, res, next) => {
    try {
        const dish = await Dishes.findByIdAndDelete(req.params.id);
        if (!dish) {
            return res.status(400).json({
                success: false,
                data: 'No dish found',
            });
        }
        res.status(200).json({
            success: true,
            deletedData: dish,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: 'Bad Request',
        });
    }
};
