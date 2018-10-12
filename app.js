const express = require('express');
const methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');
var Post = require('./models/post.js');
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.get('/',(req,res) => {
    res.redirect('/posts')
})

app.get('/posts/:id/edit', (req, res) => {
  Post.findById(req.params.id, function(err, post) {
    res.render('post-edit', {post: post});
  })
})

app.post('/posts', (req, res) => {
    Post.create(req.body).then((post) => {
        console.log(post)
        res.redirect(`/posts/${post._id}`) // Redirect to post/:id
    }).catch((err) => {
        console.log(err.message)
    })
})

app.put('/posts/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body)
    .then(post => {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

app.delete('/posts/:id', function(req, res) {
    console.log("DELETE post")
    Post.findByIdAndRemove(req.params.id).then((post) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})

app.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id).then((post) => {
    res.render('singlepost', { post: post })
  }).catch((err) => {
    console.log(err.message);
  })
})

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

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
