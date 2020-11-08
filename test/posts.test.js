import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index.js";
import mongoose from "mongoose";
import Posts from "../src/modals/post.js";

chai.should();
chai.use(chaiHttp);
let id;
describe("blogPage", () => {
  // test GET route
  before(async () => {
    await Posts.deleteMany();
  });

  // test POST route

  it("should create a new post and return to 201 status", (done) => {
    const post = {
      title: "demo title to test",
      description: "demo description of the body",
    };
    chai
      .request(app)
      .post("/posts")
      .send(post)
      .end((error, res) => {
        if (error) done(error);
        id = res.body._id;
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("description");
        res.body.should.have.property("title");

        done();
      });
  });

  it("should not create new a post without a title property and return to 400 status", (done) => {
    const post = {
      description: "demo description of the body",
    };
    chai
      .request(app)
      .post("/posts")
      .send(post)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        done();
      });
  });

  it("should not create new a post without a description property and return to 400 status", (done) => {
    const post = {
      title: "demo title to test",
    };
    chai
      .request(app)
      .post("/posts")
      .send(post)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        done();
      });
  });

  it("should GET all posts", (done) => {
    chai
      .request(app)
      .get("/posts")
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  // test GET (by id) route

  it("should GET a post by ID", async () => {
    chai
      .request(app)
      .get(`/posts/${id}`)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("_id");
        res.body.should.have.property("description");
        res.body.should.have.property("title");
      });
  });

  it("should NOT GET a post by ID", async () => {
    chai
      .request(app)
      .get(`/posts/5fa7d52469068c0528ab9419`)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(404);
        // res.text.should.be.eq("No post found");
      });
  });

  // test PUT route
  it("should update a post and return to 200 status", (done) =>{
    const  post = {
      title:" title to test updated",
      description:"demo description of the body updated"
    };
    chai
    .request(app)
    .put(`/posts/${id}`)
    .send(post)
    .end((error, res) =>{
     if(error) done(error);
     res.should.have.status(200);
     res.body.should.be.a("object");
     done();
    })
  })

  // test DELETE route

  it("should delete  a post and return to 201 status", (done) => {
    const post = {
      title: "demo title to test",
      description: "demo description of the body",
    };
    chai
      .request(app)
      .delete(`/posts/${id}`)
      .send(post)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        res.body.should.be.a("object");

        done();
      });
  });

  it("should NOT GET all posts", (done) => {
    chai
      .request(app)
      .get("/posts")
      .end((error, res) => {
        if(error) {done(error)};
        res.should.have.status(404);
        done();
      });
  });
});
