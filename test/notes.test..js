const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');
chai.use(chaiHttp);
const noteDB = require('./notes.json');
const { expect } = require('chai');
const { string } = require('joi');
chai.should();

describe('create notes api', () => {
  it('givenCreateNotes_validToken_shouldNotbeCreated', (done) => {
    const token = noteDB.notes.validToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .post('/note')
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('givenCreateNotes_whenInvalidToken_shouldNotbeCreated', (done) => {
    const token = noteDB.notes.invalidToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .post('/note')
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// get note test cases
describe('get notes api', () => {
  it('notes', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/notes')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('givenCreateNotes_whenInvalidToken_shouldNotbeGet', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/notes')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
// get data by id
describe('Get notes by ID api', () => {
  it('Given Token Should Give false When it is invalid Token', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/notes/:id')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('given token should be valid token', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/notes/61d88901a543c18ec872cd50')
      .set({ authorization: token })
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('given token should be invalid token', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/notes/61d88901a543c18ec872cd50')
      .set({ authorization: token })
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('givenPoperDetails_ShouldGetNoteByid', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/notes/61d88901a543c18ec872cd50')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenImPoperDetails_ShouldGetNoteid', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/notes/61d88901a543c18ec872cd50')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("Should return true from GetNoteApi Service Layer ,return appropriate response", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/notes/61d88901a543c18ec872cd50')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it("Should return true from GetNoteApi model layer  , return appropriate response", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/notes/61d88901a543c18ec872cd50')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it("Should return true from GetNoteApi when note is find  , return appropriate response", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/notes/61d88901a543c18ec872cd50')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
});

// Update data by id
describe("Update Note By Id", () => {
  it("when call updateNoteById with validToken , should return appropriate response from controller", (done) => {
    const token = noteDB.notes.validToken;
    const updateNotes = {
      title: "delolite Company Employee",
      description: "harpeert is my brother"
    };
    chai
      .request(server)
      .put("/updatenotes/61d89b2ed11dc06d15554019")
      .set({ authorization: token })
      .send(updateNotes)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });

  it("when call updateNoteById with inValidToken , should return appropriate response from controller", (done) => {
    const token = noteDB.notes.invalidToken;
    const updateNotes = {
      title: noteDB.notes.title,
      description: faker.lorem.word()
    };
    chai
      .request(server)
      .put("/updatenotes/61d89b2ed11dc06d15554019")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });

  it('InvalidToken_should give false when it is invalid entry of token', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
        .request(server)
        .put('/updatenotes/:id')
        .set({ authorization: token })
        .end((err, res) => {
            res.should.have.status(400);
            done();
        });
});

  it("when call updateNoteById with valid input , should return appropriate response from controller", (done) => {
    const token = noteDB.notes.validToken;
    const updatenotes = {
      title: "Science City",
      description: "one thing will ends At one"
    };
    chai
      .request(server)
      .put("/updatenotes/61d89b2ed11dc06d15554019")
      .set({ authorization: token })
      .send(updatenotes)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });

  it("when call updateNoteById with false title , should return appropriate response from controller", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .put("/updatenotes/61d89b2ed11dc06d15554019")
      .set({ authorization: token })
      .send({ title: "S", description: "golden period of life" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });

  it("when call updateNoteById with false description , should return appropriate response from controller", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .put("/updatenotes/61d89b2ed11dc06d15554019")
      .set({ authorization: token })
      .send({ title: "School", description: "g" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });

  it("when call updateNoteById with valid input , should return appropriate response from service", (done) => {
    const token = noteDB.notes.validToken;
    const updateNotes = {
      title: "Kite",
      description: "Kite is Flyes in the Sky"
    };
    chai
      .request(server)
      .put("/updatenotes/61d89b2ed11dc06d15554019")
      .set({ authorization: token })
      .send(updateNotes)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });

  it("when call updateNoteById , should return appropriate response from model", (done) => {
    const token = noteDB.notes.validToken;
    const updateNotes = {
      title: "Sceince",
      description: "fgsrgeffBJBKWBDKJBWDkvsdvsdvv dh"
    };
    chai
      .request(server)
      .put("/updatenotes/61d89b2ed11dc06d15554019")
      .set({ authorization: token })
      .send(updateNotes)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
})

// Delete Note by id
describe('Delete notes api', () => {
  it('givenInvalidToken_should give false when it is invalid entry of token', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .delete('/note/:id')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  })
  it('should give true when id is validate', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .delete('/note/61d88901a543c18ec872cd50')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  })
  it('_should give true when,return appropriate response from Service layer ', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .delete('/note/61d88901a543c18ec872cd50')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          return done();
        }
        res.should.have.status(204);
        done();
      });
  })
  it('_should give true when,return appropriate response from Model layer ', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .delete('/note/61d88901a543c18ec872cd50')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          return done();
        }
        res.should.have.status(204);
        done();
      });
  })
  it('_should give true when,return particular userid is found ', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .delete('/note/61d88901a543c18ec872cd50')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          return done();
        }
        res.should.have.status(204);
        done();
      });
  })
  it('_should give true when,return particular userid and note is found and deleting a note ', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .delete('/note/61d88901a543c18ec872cd50')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          return done();
        }
        res.should.have.status(204);
        done();
      });
    })
  })