const bcrypt = require('bcryptjs');
const user = require('../models/user');

function saveNewUser(req) {
    let salt = bcrypt.genSaltSync(8);
    let hashedPassword = bcrypt.hashSync(req.query.password, salt);

    var User = new user({
        password: hashedPassword,
        name: req.query.name,
        email: req.query.email,
    });

    User.save((err, User) => {
        if (err) return console.log(err);
        console.log(User + '\n Successfully saved');
    });
}
module.exports = saveNewUser;
