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
      .get('/note/:id')
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
      .get('/note/61c28a8516512bcec838cbbc')
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
      .get('/note/61c28a8516512bcec838cbbc')
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
      .get('/note/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send('61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenImPoperDetails_ShouldGetNoteid', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/note/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send('61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("Should return true from GetNoteApi Service Layer ,return appropriate response", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/note/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send('61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it("Should return true from GetNoteApi model layer  , return appropriate response", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/note/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send('61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it("Should return true from GetNoteApi when note is find  , return appropriate response", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/note/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
});

// Update data by id
describe('Update notes api', () => {
  it('givenInvalidToken_should give false when it is invalid entry of token', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .put('/note/:id')
      .set({ authorization: token })
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should give true when id it is validated', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .put('/note/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('should give false when payload is not validated', (done) => {
    const token = noteDB.notes.invalidToken;
    const UpdateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word()
    }
    chai
      .request(server)
      .put('/note/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .send(UpdateNote)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('givenProperDetails_ShouldUpdateNote Using Fake Data', (done) => {
    const token = noteDB.notes.validToken;
    const UpdateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word()
    }
    chai
      .request(server)
      .put('/note/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .send(UpdateNote)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('Should return true from UpdateNote Service Layer , return appropriate response', (done) => {
    const token = noteDB.notes.validToken;
    const UpdateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word()
    }
    chai
      .request(server)
      .put('/note/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .send({UpdateNote})
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('Should return true from ModelLayer , return appropriate response', (done) => {
    const token = noteDB.notes.validToken;
    const UpdateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word()
    }
    chai
      .request(server)
      .put('/note/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .send({UpdateNote})
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('Should return true when id is matched', (done) => {
    const token = noteDB.notes.validToken;
    const UpdateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word()
    }
    chai
      .request(server)
      .put('/note/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .send({UpdateNote})
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('Should return true when note is updated', (done) => {
    const token = noteDB.notes.validToken;
    const UpdateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word()
    }
    chai
      .request(server)
      .put('/note/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .send(UpdateNote )
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

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
      .delete('/note/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  })
  it('_should give true when,return appropriate response from Service layer ', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .delete('/note/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          return done();
        }
        res.should.have.status(201);
        done();
      });
  })
  it('_should give true when,return appropriate response from Model layer ', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .delete('/note/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          return done();
        }
        res.should.have.status(201);
        done();
      });
  })
  it('_should give true when,return particular userid is found ', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .delete('/note/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          return done();
        }
        res.should.have.status(201);
        done();
      });
  })
  it('_should give true when,return particular userid and note is found and deleting a note ', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .delete('/note/61c28a9316512bcec838cbbe')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          return done();
        }
        res.should.have.status(201);
        done();
      });
  })
})