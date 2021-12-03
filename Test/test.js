const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const registrationData = require('./user.json');
const loginData = require('./user.json');

chai.should();

describe('registartion', () => {
  it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
    const registartionDetails = registrationData.user.correctRegister;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          // return done(err);
          console.log('Please check details again and re-enter the details with proper format');
          done()
        }
        res.should.have.status(200);
        // res.body.should.have.property('message')
        console.log('Test Cases passes for the proper registration details');
        done()
      });
  });

  it('givenRegistrationDetails_whenImpProper_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithImproperDetails;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          // return done(err);
          console.log('Please check details again and re-enter the details with proper format');
          done();
        }
        res.should.have.status(400);
        console.log('Test Cases passes for the Improper registration details ');
        done();
      });
  });

  it('givenRegistrationDetails_withOut_email_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithOutEmail;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        console.log('Test case passes for givenRegistrationDetails_withOut_email_shouldNotSaveInDB');
        done();
      });
  });

  it('givenRegistrationDetails_withOut_firstName_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithOutfirstName;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        console.log('Test cases passes for givenRegistrationDetails_withOut_firstName_shouldNotSaveInDB');
        done();
      });
  });
});