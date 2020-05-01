const express = require('express');
const router = express.Router();
const {
    getDish,
    getDishes,
    updateDish,
    deleteDish,
    createDish,
} = require('../controller/dishes');

router.route('/').get(getDishes).post(createDish);
router.route('/:id').get(getDish).put(updateDish).delete(deleteDish);
module.exports = router;
