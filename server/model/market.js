const mongoose = require('mongoose')
const Schema = mongoose.Schema

const marketSchema = new Schema({
	_id: String,
    base: String,
    quote: String,
    pairing: String,
    symbol: String,
    market_name: String
})

module.exports = mongoose.model('Market', marketSchema)