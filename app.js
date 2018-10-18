const express = require('express');
const methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');
const postController = require('./controllers/postController.js');
const saveNewUser = require('./controllers/registerController.js');
const commentController = require('./controllers/commentController.js');
const authController = require('./controllers/AuthController');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://spglancy:qwaszx51@ds043987.mlab.com:43987/intensive', {useNewUrlParser: true });

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use('/', postController);
app.use('/', commentController);
app.use('/api/auth', authController);

app.get('*', function (req, res) {
	res.send({
		message: 'This endpoint does not exist',
		error: 404,
	}, 404);
});
// saveNewUser(app);

app.listen(port);

module.exports = app;
