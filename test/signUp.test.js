 import chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../src/index.js';
 import mongoose from "mongoose";
 import User from '../src/modals/userModal.js';

 let should = chai.should();
chai.use(chaiHttp);

describe("signUp", () =>{
  beforeEach((done) =>{
   User.remove({}, (error) =>{
    if(error) done(error);
    done();
   }) 
  })
  it("should create an account and return to 201 stutus",(done) =>{
    const user = { 
      name: "testname",
      email:"test@gmail.com",
      password:"password"
    }
chai.request(app)
 .post("/api/user/register")
 .send(user)
 .end((error, res) =>{
   if(error) done(error);
   res.should.have.status(201);
   res.body.should.be.a("object");
   
   done();
 })
  })
  it("")
})
