const router = require('express').Router()

const TripController = require('../controller/trips.controller')

router.get('/', TripController.findByKeywordController)

module.exports = router
