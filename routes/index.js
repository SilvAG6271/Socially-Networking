const router = require('express').Router();
const apiRoutes = require('./api');

//define the api route, api will be used in address to get data 
router.use('/api', apiRoutes);

module.exports = router;
