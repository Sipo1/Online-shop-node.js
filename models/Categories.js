const { Schema, model } = require("mongoose")

const Categories = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
})

module.exports = model("Categories", Categories)