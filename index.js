const express = require("express");
const mongoose = require("mongoose")
const routes = require('./routes/routes')

const cors = require('cors')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())
routes(app);

const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://Artur:Artur123@cluster0.2cv4967.mongodb.net/online-shop")
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
start()