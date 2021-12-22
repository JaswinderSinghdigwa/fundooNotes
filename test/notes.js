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
      .post('/createnotes')
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
      .post('/createnotes')
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
  it.only('notes', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/getnotes')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it.only('givenCreateNotes_whenInvalidToken_shouldNotbeGet', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/getnotes')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
// get data by id
describe('Get notes by ID api', () => {
  it.only('given token should be valid token', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it.only('given token should be invalid token', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it.only('givenPoperDetails_ShouldGetNoteid', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token,'61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it.only('givenPoperDetails_ShouldGetNoteid', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token,'61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it.only("Should return true from GetNoteApi service  , return appropriate response", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token,'61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(201);
        return done();
      });
  });
  it.only("Should return false from GetNoteApi service  , return appropriate response", (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token,'61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it.only("Should return true from GetNoteApi model layer  , return appropriate response", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token,'61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(201);
        return done();
      });
  });
  it.only("Should return false from GetNoteApi model Layer  , return appropriate response", (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token,'61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it.only("Should return true from GetNoteApi when note is  find  , return appropriate response", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token,'61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(201);
        return done();
      });
  });
  it.only("Should return false from GetNoteApi when note is not find   , return appropriate response", (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token,'61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
});
