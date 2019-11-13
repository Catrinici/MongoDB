module.exports = function Route(app) {
    app.get("/", (req, res) => {
        User.find()
            .then(data => res.render("index", { users: data }))
            .catch(err => res.json(err));
    });
    app.post("/users", function(req, res) {
        const user = new User();
        user.first_name = req.body.first_name;
        user.age = req.body.age;
        user
            .save()
            .then(newUserData => console.log("user created: ", newUserData))
            .catch(err => console.log(err));
    });
};