const Router = require("express")
const BasketRouter = new Router()
const controller = require("../authController.js")


BasketRouter.post("/basketPost", controller.postBasket)
BasketRouter.get("/basketGet", controller.getBasket)
BasketRouter.delete("/basket/delete/:id", controller.deleteCard)
BasketRouter.put("/editBasket/:id", controller.editBasket)



module.exports = BasketRouter
