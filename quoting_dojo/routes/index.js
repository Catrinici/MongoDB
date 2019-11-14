module.exports = function Route(app) {
    app.get('/', function(req, res) {
        res.render('welcome');
    });
    app.get('/quotes', function(req, res) {
        Quote.find({}, function(err, quotes) {
            if (err) { console.log(err); }
            res.render('quotes', { quotes: quotes });
        });
    });



}