const Router = require("express")
const Phones = new Router()
const controller = require("../authController")


Phones.get("/searchGadjet", controller.searchGadjet)
Phones.get("/gadjetGet/:name", controller.gadjetGet)
Phones.put("/gadjetPut/:name/:id", controller.gadjetPut)
Phones.post("/phonesPost", controller.phonesPost)
Phones.post("/gadjetPost/:name",controller.gadjetPost)
Phones.delete("/gadjetDelete/:name/:id",controller.gadjetDelete)



module.exports = Phones
