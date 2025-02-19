const { WHITELIST_DOMAINS } = require('../utils/constants')

const corsOptions = {
  origin: function (origin, callback) {

    if (!origin) {
      return callback(null, true)
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    return callback('403')
  },

  optionsSuccessStatus: 200,
 
  // CORS sẽ cho phép nhận cookies từ request
  credentials: true
}
module.exports = {
    corsOptions
}