const route = require("express").Router();
const userRoute = require("./user")

userRoute(route)

module.exports = route

