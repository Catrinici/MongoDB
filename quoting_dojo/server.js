const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/views")));
app.set("view engine", "ejs");
mongoose.connect('mongodb://localhost/quoting_dojo');

const quoteSchema = new mongoose.Schema({
    author: { type: String, required: true, minlength: 2 },
    quote: { type: String, required: true, minlength: 6 }
}, { timestamps: true })

const Quote = mongoose.model('quotes', quoteSchema);

app.get('/', function(req, res) {
    res.render('welcome');
});

app.get('/quotes', function(req, res) {
    Quote.find()
        .then(quote => res.render('quotes', { quotes: quote }))
        .catch(err => res.json(err))
})

app.post('/quotes', function(req, res) {
    const quote = new Quote();
    quote.author = req.body.author;
    quote.quote = req.body.quote;
    quote.save()
        .then(quote => res.redirect('/quotes'))
        .catch(err => res.redirect('/'))
})


app.listen(port, () => console.log(`listening on port ${port}`));