const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);
const registrationData = require('./user.test.json');
const loginData = require('./user.test.json');
const userInputs = require('./user.test.json');
const inputData = require('./user.test.json');
const faker = require('faker');
const { getMaxListeners } = require('../App/models/otp.model');

chai.should();

describe('registartion', () => {  
  it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
    const registartion = registrationData.user.correctRegister;
    const registartionDetails = {
        firstName : faker.name.firstName(),
        lastName  : faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        res.should.have.status(200);
        // res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Resgistration is done Successfully');
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
          console.log('Please check details again and re-enter the details with proper format');
          done();
        }
        res.should.have.status(400);
        res.body.should.have.property('message').eql('User is already exist');
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
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('"email" is required');
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
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('"firstName" is required');
        done();
      });
  });
});

describe('login', () => {
  it('givenLoginDetails_whenProper_shouldAbleToLogin', (done) => {
    const loginDetails = loginData.user.login;
    const login = {
      email : faker.internet.email(),
      password : faker.internet.password()
    }
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenLoginDetails_whenImproper_shouldUnableToLogin', (done) => {
    const loginDetails = loginData.user.loginWithImproperDetails;
    chai
      .request(server)
      .post('/login')
      .send({
        email : "finjadas1212@getMaxListeners.com", password : "1121212"
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property('message').eql('failed to validated Input');
        done();
      });
  });
});

describe('forgotPassword', () => {
  it('givenValidData_whenProper_souldAbleToSendEmailToUserEmail', (done) => {
    const forgotPasswordDetails = userInputs.user.ForgotPasswordPos;
    chai.request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done('Invalid details received instead of valid', error);
        }
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Email sent successfully');
        return done();
      });
  });
  it('givenInValidEmail_shouldNotAbleToSendEmailToUserEmail', (done) => {
    const forgotPasswordDetails = userInputs.user.ForgotPasswordNegNonRegistered;
    chai.request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done('email-id is empty or unable to fetch details');
        }
        res.should.have.status(500);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Some error occured while registering');
        done();
      });
  });
});

describe('reset Password API', () => {
  it('givenresetdetails_whenproper_shouldberesetlinkSent', (done) => {
    const reset = inputData.user.validDetails;
    const registration = {
      email : faker.internet.email(),
      password : faker.internet.password(),
      code : faker.random.word()
    }
    chai
      .request(server)
      .put('/reset-Password')
      .send(reset)
      .end((error, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('givenresetdetails_whenNotproper_shouldberesetlinkSent', (done) => {
    const reset = inputData.user.invalidDetails;
    const registerfaker = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    chai
      .request(server)
      .put('/reset-Password')
      .send(registerfaker)
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('"code" is required');
        done();
      });
  });
});