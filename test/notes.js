const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');
const validation = require('../utilities/validation')

chai.use(chaiHttp);
const noteDB = require('./notes.json');
chai.should();

describe('create notes api', () => {
  it('notes', (done) => {
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
    console.log(createNotes);
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

describe('get notes api by id ', () => {
  it('get notes by id Api return Success when token is verify ', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/getnotes/:id')
      .set({ authorization: token })
      .send()
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('get notes By id Api return Failure when token is not verified', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/getnotes/:id')
      .set({ authorization: token })
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

  describe('get notes api by id ', () => {
    it('get notes by id when  ids not match with token id  ', (done) => {
      const id = req.user.dataForToken.id;
      const resultOFFind = notes.findById(id);
      chai
        .request(server)
        .get('/getnotes/:id')
        .send(resultOFFind)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

    describe('get notes api by id ', () => {
      it('get notes by id when  ids match with token id ', (done) => {
        const id = noteDB.notes.validToken.id;
        const resultOFFind = notes.findById(id);
        chai
          .request(server)
          .get('/getnotes/:id')
          .send(resultOFFind)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });