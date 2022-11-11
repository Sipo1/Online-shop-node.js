const { Schema, model } = require("mongoose")

const Laptop = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    img: { type: String, required: false },
    price: { type: String, required: true },
    type: { type: String, required: true },    
})

module.exports = model("Laptop", Laptop)

