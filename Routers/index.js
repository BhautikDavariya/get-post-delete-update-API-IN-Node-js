const express = require('express')
const route = express.Router()
// const { ensureAuthorized } = require('../middleware/auth')


const student = require('./Student')
route.use('/student', student)

module.exports = route