const Router = require("express")
const mostSaledItems = new Router()
const controller = require("../authController")


mostSaledItems.get("/mostSaledOneItemsGet/:id", controller.mostSaledOneItemsGet)
mostSaledItems.get("/mostSaledItemsGet", controller.mostSaledItemsGet)



module.exports = mostSaledItems
