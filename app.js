const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var Post = require('./models/post.js');
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res) => {
    res.redirect('/posts')
})

app.post('/posts', (req, res) => {
    Post.create(req.body).then((post) => {
        console.log(post)
        res.redirect(`/posts/`) // Redirect to reviews/:id
    }).catch((err) => {
        console.log(err.message)
    })
})

// app.get('/posts/:id', (req,res) => {
//     res.render(`/singlepost/${post._id}`)
// })

app.get('/posts', (req, res) => {
  Post.find().then(post => {
      res.render('home', {
            post: post
        });
    })
    .catch((err) => {
    console.log(err);
    })
})

app.get('/new-post', (req,res) => {
    res.render('new-post', {});
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
