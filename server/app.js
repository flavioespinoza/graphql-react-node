const _log = require('@flavioespinoza/log_log')._log
const log = require('@flavioespinoza/log_log').log

const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use('/hitbtc', graphqlHTTP({
	schema: schema,
	graphiql: true,
}))

const PORT = 5001

app.listen(PORT, () => {
	console.log('listening on port: ' + PORT)
})