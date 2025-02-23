var router = require('express').Router({mergeParams:true})
const customerData = require('../data/customerData')

router.get('/', customerData.getCustomers)

module.exports = router;
