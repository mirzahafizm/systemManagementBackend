const route = require("express").Router()
const controller = require('../controllers/user')
const validator = require('../helper/validator')
const registerValidation = require('../validation/rule/user/register')
const loginValidation = require('../validation/rule/user/login')
const {auth} = require("../helper/auth")

module.exports = (parentRoute) => {
    parentRoute.use("/user", route)
    route.post("/register", registerValidation, validator, controller.register)
    route.post("/login", loginValidation, validator, controller.login)
    route.get("/current", auth('ADMIN', 'STAFF'), controller.current)
}