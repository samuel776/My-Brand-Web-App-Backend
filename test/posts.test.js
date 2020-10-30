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
       const postId = new Post({
         title:"demo title of the article",
         description:"demo description of the body"
       });
      chai.request(app)
      .get(`/posts/${postId}`)
      .send(postId)
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

    it( "should NOT GET a post by ID", (done) =>{
      const postId = new Post({
        title:"demo title of the article",
        description:"demo description of the body"
      });
     chai.request(app)
     .get(`/posts/${postId}`)
     .send(postId)
     .end((error,res) =>{
       if(error) done(error);
       res.should.have.status(500);
       res.text.should.be.eq("'No post found'"); 
       done();
     });
   });
  });

// test POST route


  describe("POST/posts", () =>{
    beforeEach((done) =>{
     post.remove({}, (error) =>{
      if(error) done(error);
      done();
     }) 
    })
    it("should create a new post and return to 201 status",(done) =>{
      const post = { 
        title: "demo title to test",
        description:"demo description of the body",
        imagreUrl:""
      }
  chai.request(app)
   .post("/posts")
   .send(post)
   .end((error, res) =>{
     if(error) done(error);
     res.should.have.status(201);
     res.body.should.be.a("object");
     res.body.should.have.property("required");
    res.body.should.have.property("string");
     
     done();
   });
    });

    it("should not create new a post without a title property and return to 404 status",(done) =>{
      const post = { 
        description:"demo description of the body",
        imagreUrl:""
      }
  chai.request(app)
   .post("/posts")
   .send(post)
   .end((error, res) =>{
     if(error) done(error);
     res.should.have.status(404);
     done();
   });
    });

    it("should not create new a post without a description property and return to 404 status",(done) =>{
      const post = { 
        title: "demo title to test",
        imagreUrl:""
      }
  chai.request(app)
   .post("/posts")
   .send(post)
   .end((error, res) =>{
     if(error) done(error);
     res.should.have.status(404);
     done();
   });
    });
});



// test PUT route

describe("PUT/posts/:id", () =>{
  beforeEach((done) =>{
   post.remove({}, (error) =>{
    if(error) done(error);
    done();
   }); 
  });

  it("should update  a post and return to 201 status",(done) =>{
    const post = { 
      title: "demo title to test",
      description:"demo description of the body",
      imagreUrl:""
    }
chai.request(app)
 .put("/posts")
  .send(post)
 .end((error, res) =>{
   if(error) done(error);
   res.should.have.status(201);
   res.body.should.be.a("object");
   res.body.should.have.property("required");
  res.body.should.have.property("string");
   
   done();
 });
  });


// test DELETE route

describe("DELETE/posts/:id", () =>{
  beforeEach((done) =>{
   post.remove({}, (error) =>{
    if(error) done(error);
    done();
   }); 
  });

  it("should delete  a post and return to 201 status",(done) =>{
    const post = { 
      title: "demo title to test",
      description:"demo description of the body",
      imagreUrl:""
    }
chai.request(app)
 .delete("/posts")
  .send(post)
 .end((error, res) =>{
   if(error) done(error);
   res.should.have.status(201);
   res.body.should.be.a("object");
   res.body.should.have.property("required");
  res.body.should.have.property("string");
   
   done();
 });
  });

});
});
});
