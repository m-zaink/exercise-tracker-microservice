const express = require('express');
const router = express.Router();

const apiExerciseRouter = require('./api-exercise-routes');

// POST routes go here.
router.post('/', (req, res) => {
    res.send('ROUTE POST (/)');
});

router.use('/api/exercise', apiExerciseRouter);
module.exports = router;