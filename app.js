const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const postController = require('./controllers/postController.js');
const saveNewUser = require('./controllers/registerController.js');
const commentController = require('./controllers/commentController.js');
const authController = require('./controllers/AuthController');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const config = require('./config.js')

/**
 * Connecting to the mongoDB
 */
	mongoose.connect( config.mongoURL, { useNewUrlParser: true })
	.catch(err =>{
		throw err;
	})

/**
 * Importing static files.
 */
app.use(express.static(__dirname + '/public'));

/**
 * Configuring bodyparser.
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))


/**
 * View engine.
 */

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/**
 * Setting application routes
 */

app.use('/', postController);
app.use('/', commentController);
app.use('/api/auth', authController);

/**
 * 404 redirect
 */
app.get('*', function (req, res) {
	res.send({
		message: 'This endpoint does not exist',
		error: 404,
	}, 404);
});
// saveNewUser(app);

/**
 * Starting application on configured port.
 */
app.listen(config.port, () => {
	console.log(`Application is running on: ${config.port}`);
});

module.exports = app;
