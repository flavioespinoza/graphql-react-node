const mongoose = require('mongoose')
const Schema = mongoose.Schema

const marketSchema = new Schema({
    base: String,
    quote: String,
    pairing: String,
    symbol: String,
    market_name: String,
    increment: Number,
    tick: Number,
    makerFee: Number,
    takerFee: Number,
    feeCurrency: String
})

module.exports = mongoose.model('Market', marketSchema)