const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
// const flash = require('express-flash');
// const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/views")));
app.set("view engine", "ejs");
// app.use(flash());

// const sessionConfig = {
//     saveUninitialized: true,
//     resave: false,
//     name: 'session',
//     secret: 'thisisASecret'
// };


mongoose.connect("mongodb://localhost/quoting_dojo", { useUnifiedTopology: true, useNewUrlParser: true });

const quoteSchema = new mongoose.Schema({
    author: { type: String, required: true, minlength: 2 },
    quote: { type: String, required: true, minlength: 6 }
}, { timestamps: true })

const Quote = mongoose.model('quotes', quoteSchema)

app.get('/', function(req, res) {
    res.render('welcome');
});
app.get('/quotes', function(req, res) {
    Quote.find({}, function(err, quotes) {
        if (err) { console.log(err); }
        res.render('quotes', { quotes: quotes });
    });
});
app.post('/quotes', function(req, res) {
    const quote = new Quote();
    quote.author = req.body.author;
    quote.quote = req.body.quote;
    quote.save()
        .then(newQuoteData => console.log('quote added: ', newQuoteData))
        .catch(err => console.log(err));

    res.render('quotes')
})


require("./routes/index.js")(app);

app.listen(port, () => console.log(`listening on port ${port}`));