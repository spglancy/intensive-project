const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Post = require('../models/post');

chai.use(chaiHttp);

const samplePost =     {
    "content": "asdf"
}

describe('Post', ()  => {

    after(() => {
    Post.deleteMany({content: 'asdf'}).exec((err, reviews) => {
      console.log(post)
      Post.remove();
    })
  });

  // TEST INDEX
  it('should render all posts on get /posts', (done) => {
    chai.request(server)
        .get('/posts')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
  it('should have a place to create posts on get /posts', (done) => {
    chai.request(server)
        .get('/posts')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
  it('should create a post on post /posts', (done) => {
    chai.request(server)
        .post('/posts')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
  it('should render edit page on get /posts/:id/edit', (done) => {
    chai.request(server)
        .get('/posts/:id/edit')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
  it('should put edited post on put /posts/:id', (done) => {
      var post = new Post(samplePost);
      post.save((err, data) => {
    chai.request(server)
        .put(`/posts/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
});
  it('should delete post on delete /posts/:id', (done) => {
      var post = new Post(samplePost);
      post.save((err, data) => {
    chai.request(server)
        .delete(`/posts/${data._id}?_method=DELETE`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
});
  it('should show post on get /posts/:id', (done) => {
      var post = new Post(samplePost);
      post.save((err, data) => {
    chai.request(server)
        .get(`/posts/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
});
});
