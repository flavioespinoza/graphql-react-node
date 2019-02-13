const express = require('express')

const app = express()

const PORT = 6001

app.listen(PORT, () => {
	console.log('listening on port: ' + PORT)
})