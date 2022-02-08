const express = require('express')
const route = express.Router()


const studentController = require('../Controllers/studentController')
route.get('/get', (req, res) => {
    return studentController.student.GetAll(req, res)
})

route.post('/add', (req, res) => {
    return studentController.student.add(req, res)
})

route.post('/update', (req, res) => {
    return studentController.student.update(req, res)
})

route.post('/delete', (req, res) => {
    return studentController.student.delete(req, res)
})

route.post('/getid', (req, res) => {
    return studentController.student.getById(req, res)
})

route.post('/login', (req, res) => {
    return studentController.student.login(req, res)
})

module.exports = route