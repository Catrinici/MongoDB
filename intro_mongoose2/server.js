const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/views")));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/my_first_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

require("./routes/index.js")(app);

app.listen(port, () => console.log(`listening on port ${port}`));