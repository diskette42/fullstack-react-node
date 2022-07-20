const TripService = require('../service/trips.service')
function findByKeywordController(req, res, next) {
  try {
    const { keyword } = req.query
    const result = TripService.findByKeyword(keyword)
    return res.json(result)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  findByKeywordController,
}
