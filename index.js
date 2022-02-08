const express = require('express')
const app = express()

require('dotenv').config()
require('./Config/db')

// limit 
app.use(express.json({
    limit: '1024mb'
}))
app.use(express.urlencoded({
    limit: '1024mb',
    extended: true
}))

const route = require('./Routers/index')
app.use('/api', route)

const port = process.env.PORT || 4000

app.listen(port, function () {
    console.log(`The web server has started on port ${port}`);
    console.log("New added")
    console.log(process.env.databaseUrl)
});