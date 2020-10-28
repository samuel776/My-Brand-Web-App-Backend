import chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../src/index.js';
 import mongoose from "mongoose";
 import Post from '../src/modals/post.js';

 chai.should();
chai.use(chaiHttp);
 
describe("blogPage", () =>{
  
  // test GET route
describe("GET/posts", () =>{
  it( "should GET all posts", (done) =>{
    chai.request(app)
    .get("/posts")
    .end((error,res) =>{
      if(error) done(error);
      res.should.have.status(200);
       res.body.should.be.a("array");
      done();
    });
  });

  it( "should NOT GET all posts", (done) =>{
    chai.request(app)
    .get("/post")
    .end((error,res) =>{
      if(error) done(error);
      res.should.have.status(404);
      done();
    });
  });
});


  // test GET (by id) route

  describe("GET/posts/:id", () =>{
    it( "should GET a post by ID", (done) =>{
       const postId = 1;
      chai.request(app)
      .get(`/posts/${postId}`)
      .end((error,res) =>{
        if(error) done(error);
        res.should.have.status(200);
         res.body.should.be.a("object");
         res.body.should.have.property("id");
         res.body.should.have.property("required");
         res.body.should.have.property("string");
        done();
      });
    });
  });

// test POST route



// test PUT route



// test DELETE route


})