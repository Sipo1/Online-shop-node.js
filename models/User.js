const { Schema, model } = require("mongoose")

const User = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: "Role" }],
    img: { type: String, },
    buyItems: { type: Array, size: "large" }
})

module.exports = model("User", User)