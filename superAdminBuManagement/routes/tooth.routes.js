
const express = require('express')
const { getAllTooths } = require('../../businessUnitAdministration/controller/tooth.controller')
const toothRouter = express.Router()

toothRouter
.get('/getallTooths',getAllTooths)


module.exports = toothRouter