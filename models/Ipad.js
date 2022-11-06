const { Schema, model } = require("mongoose")

const Ipad = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    img: { type: String },
    price: { type: String, required: true },
})

module.exports = model("Ipad", Ipad)

