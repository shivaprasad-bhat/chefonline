const mongoose = require('mongoose');
const DishesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: [20, 'Dish name can not exceed 20 characters'],
    },
    slug: String,
    category: {
        type: String,
        enum: ['veg', 'nonveg'],
    },
    ingredients: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: 'no-image.jpg',
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Dishes', DishesSchema);
