const { Schema, model } = require("mongoose")

const Basket = new Schema({
    name: { type: String, required: true },
    description: { type: String},
    price: { type: String, required: true },
    img: { type: String, required: true },
    basketImg: { type: String},
    isToggle: { type: Boolean},
})

module.exports = model("Basket", Basket)