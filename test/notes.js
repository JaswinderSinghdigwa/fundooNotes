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
  it('notes', (done) => {
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

  it('givenCreateNotes_whenInvalidToken_shouldNotbeGet', (done) => {
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
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it.only('given token should be invalid token', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send()
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
      .send(token, '61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it.only('givenImPoperDetails_ShouldGetNoteid', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token, '61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it.only("Should return true from GetNoteApi Service Layer  , return appropriate response", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token, '61c28a8516512bcec838cbbc')
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
  it.only("Should return true from GetNoteApi model layer  , return appropriate response", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token, '61c28a8516512bcec838cbbc')
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
  it.only("Should return true from GetNoteApi when note is find  , return appropriate response", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token, '61c28a8516512bcec838cbbc')
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
});

// Update data by id
describe('Update notes api', () => {
  it.only('givenInvalidToken_should give false when it is invalid entry of token', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .put('/updatenotes/:id')
      .set({ authorization: token })
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('givenvalidToken_shoule give true when token is verify', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .put('/updatenotes/:id')
      .set({ authorization: token })
      .send()
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it.only('givenvalidToken_shoule give true when id it is validate', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .put('/updatenotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send()
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it.only('givenInvalidToken_ShouldUpdateNote', (done) => {
    const token = noteDB.notes.validToken;
    const note = noteDB.updateNote.validData;
    chai
      .request(server)
      .put('/updatenotes/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it.only('givenInvalidToken_ShouldUpdateNote', (done) => {
    const token = noteDB.notes.invalidToken;
    const note = noteDB.updateNote.validData;
    chai
      .request(server)
      .put('/updatenotes/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it.only('givenPoperDetails_ShouldUpdateNote Using Fake Data', (done) => {
    const token = noteDB.notes.validToken;
    const UpdateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word()
    }
    chai
      .request(server)
      .put('/updatenotes/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .send(UpdateNote)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it.only('givenInvalidToken_ShouldNotUpdateNote Using Fake Data ', (done) => {
    const token = noteDB.notes.invalidToken;
    const UpdateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word()
    }
    chai
      .request(server)
      .put('/updatenotes/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .send(UpdateNote)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  })
  it.only('Should return true from GetNoteApi Service Layer  , return appropriate response', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .put('/updatenotes/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .send()
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

// Delete Note by id
describe('Delete notes api', () => {
  it.only('givenInvalidToken_should give false when it is invalid entry of token', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .put('/deletelabel/:id')
      .set({ authorization: token })
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  })
  it.only('givenInvalidToken_should give true when it is valid entry of token', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .put('/deletelabel')
      .set({ authorization: token })
      .send(token)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  })
})