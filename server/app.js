const dotenv = require('dotenv')
dotenv.load()

const _log = require('@flavioespinoza/log_log')._log
const log = require('@flavioespinoza/log_log').log

const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

const MONGODB_URI = process.env.MONGODB_URI
const options = {
	useCreateIndex: true,
	useNewUrlParser: true
}
mongoose.connect(MONGODB_URI, options)
mongoose.connection.once('open', () => {
    _log.info('Connected to MongoDB')
})

app.use('/my-markets', graphqlHTTP({
	schema: schema,
	graphiql: true,
}))

const PORT = 5001

app.listen(PORT, () => {
	console.log('listening on port: ' + PORT)
})