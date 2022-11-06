const Router = require("express")
const Authrouter = new Router()
const controller = require("../authController.js")
const { check } = require("express-validator")
const roleMiddlware = require("../middleware/roleMiddleware")


Authrouter.post("/registration", [
    check("username", "username dont be empty").notEmpty(),
    check("password", "Match uppercase, lowercase, digit or #$!%*?& and make sure the length is 8 to 96 in length").isLength({ min: 8, max: 96 })
], controller.registration)
Authrouter.post("/login", controller.login)
Authrouter.post("/logout", controller.login)
Authrouter.put("/changePassword", controller.changePassword)
Authrouter.put("/editUserImg", controller.editUserImg)



Authrouter.get("/users", controller.getUsers)
Authrouter.delete("/users/:id", controller.deleteUser)
Authrouter.get("/getOneUser/:id", controller.getOneUser)



module.exports = Authrouter

