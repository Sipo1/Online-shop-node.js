const Authrouter = require("./authRouter")
const BasketRouter = require("./basketRoter");
const Categories = require("./categories");
const mostSaledItemsGet = require("./mostSaledItems");
const Phones = require("./phones");

const routes = (app) => {
    app.use('/api/auth', Authrouter);
    app.use('/api/', BasketRouter);
    app.use('/api/', mostSaledItemsGet);
    app.use('/api/', Categories);
    app.use('/api/', Phones);
    // app.use('*', function (res) {
    //     res.status(404).send('page not faund');
    // });
};

module.exports = routes