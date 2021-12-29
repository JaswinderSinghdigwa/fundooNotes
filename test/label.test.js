const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');
chai.use(chaiHttp);
const labelDB = require('./label.test.json');
const { expect } = require('chai');
chai.should();

describe('Add label by id api ', () => {
    it.only('AddLabelById_by_checking_server', (done) => {
        chai
            .request(server)
            .post('/addlabel/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it.only('Given Token shoule give true when token is valid', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .post('/addlabel/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it.only('Given Token Should give false when token is invalidtoken', (done) => {
        const token = labelDB.label.invalidToken
        chai
            .request(server)
            .post('/addlabel/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it.only('Given Token Should give true when payload is validate', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/:id')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it.only('Should give true when service layer give response', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61cc41d4db10efa515b4e1e8')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it.only('Should give false when service layer , is not returning appropriate response', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61cc41d4db10efa515b4e1e8')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
    it.only('Should give false when service layer , is returning null or undefine', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61cc41d4db10efa515b4e1e8')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            })
    })

})