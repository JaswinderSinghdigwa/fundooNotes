const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');
// const validation = require('../utilities/validation')
const noteJson = require('./notes.json');
chai.use(chaiHttp);
const note = require('../App/models/notes')

chai.should();

describe('create notes api', () => {
  it('notes', (done) => {
    const token = noteJson.notes.validToken;
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
    const token = noteJson.notes.invalidToken;
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
    const token = noteJson.notes.validToken;
    chai
      .request(server)
      .post('/createnotes')
      .set({ authorization: token })
      .send()
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('get notes By id Api return Failure when token is not verified', (done) => {
    const token = noteJson.notes.invalidToken;
    chai
      .request(server)
      .post('/createnotes')
      .set({ authorization: token })
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

  describe('get notes api by id ', () => {
    it('get notes by id when ids match with token id  ', (done) => {
      const token = noteJson.notes.validToken;
      const id =  noteJson.notes.id;
      note.getNote(id,(error,data)=>{
        if(data){
          console.log("331",error);
          return res.status(201).json({
            message: 'Get All Notes successfully',
            success: true,
            data: data
          });
        }
        else
        console.log("444",data);
      });
      chai
        .request(server)
        .get('/getnotes')
        .set({authorization:token})
        .send(token)
        .end((err, res) => {
          console.log("bojapuri error",res.should.have);
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('get notes api by id ', () => {
    it('get notes by id Api return Success when token is verify ', (done) => {
      const token = noteJson.notes.validToken;
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
      const token = noteJson.notes.invalidToken;
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
