const Router = require("express")
const Categories = new Router()
const controller = require("../authController")


Categories.get("/categoriesGet", controller.categoriesGet)
Categories.get("/categoriesOneGet/:id", controller.categoriesOneGet)



module.exports = Categories
