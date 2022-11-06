const { Schema, model } = require("mongoose")

const MostSaledItems = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    img: { type: String, required: true },
    basketImg: { type: String, required: true },
    isToggle: { type: Boolean, required: true },
})

module.exports = model("MostSaledItems", MostSaledItems)