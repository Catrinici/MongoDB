const mongoose = require('mongoose')


module.exports = function Route(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.post('/new', function(req, res) {
        const user = new User();
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.dob = req.body.dob;
        user.password = req.body.password;
        user.save()
            .then(user => res.redirect('/result'), console.log('succesful registered'))
            .catch(err => res.redirect('/'))
    })
}