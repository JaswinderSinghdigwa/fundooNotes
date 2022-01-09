const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");

chai.use(chaiHttp);
const redisjson = require("./redis.json");
const { expect } = require("chai");
const { string } = require("joi");
chai.should();
describe("Get notes by ID api with redis", () => {
  it("ShouldGetNote from database", (done) => {
    const token = redisjson.redis.validToken;
    chai
      .request(server)
      .get("/notes/61d88901a543c18ec872cd50")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("_ShouldGetNote from RedisCachememory", (done) => {
    const token = redisjson.redis.validToken;;
    chai
      .request(server)
      .get("/notes/61d88901a543c18ec872cd50")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
describe("Get label by ID api with redis", () => {
  it("ShouldGetlabel from Database", (done) => {
    const token = redisjson.redis.validToken;
    chai
      .request(server)
      .get("/notes/labels/61d889a6a543c18ec872cd56")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("ShouldGetlabel from database", (done) => {
    const token = redisjson.redis.validToken;
    chai
      .request(server)
      .get("/notes/labels/61d889a6a543c18ec872cd56")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});