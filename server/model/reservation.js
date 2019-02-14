const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reservationSchema = new Schema({
    data: {
        name: {type: String, required: true},
        hotelName: {type: String, required: true},
        arrivalDate: {type: String, required: true},
        departureDate: {type: String, required: true}
    }
})

module.exports = mongoose.model('Reservation', reservationSchema)