const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client/static')))
app.set('views', path.join(__dirname, './client/views'))
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/user_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



require("./server/config/routes.js")(app);
app.listen(port, () => console.log(`listening on port ${port}`));