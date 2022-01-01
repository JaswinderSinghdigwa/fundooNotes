const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');
chai.use(chaiHttp);
const labelDB = require('./label.test.json');
const { expect } = require('chai');
chai.should();

describe('Add label by id api ', () => {
    it('AddLabelById_by_checking_server', (done) => {
        chai
            .request(server)
            .post('/addlabel/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('Given Token shoule give true when token is valid', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .post('/addlabel/61cc41d4db10efa515b4e1e8')
            .set({ authorization: token })
            .send({})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Given Token Should give false when token is invalidtoken', (done) => {
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
    it('Given Token Should give true when payload is validate', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .post('/addlabel/61cc41d4db10efa515b4e1e8')
            .set({ authorization: token })
            .end((err, res) => {
                if(err){
                    res.should.have.status(400); 
                }
                res.should.have.status(200);
                done();
            })
    })
    it('Should give true when service layer is giving response', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .post('/addlabel/61cc41d4db10efa515b4e1e8')
            .set({ authorization: token })
            .send({labelName : "karan"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('Should give true when model layer is giving response', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61cd183582547e820aff07f8')
            .set({ authorization: token })
            .send({labelName : "karan"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('Should give true when note is belong to same user', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .post('/addlabel/61cc41d4db10efa515b4e1e8')
            .set({ authorization: token })
            .send({labelName : "karan"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('Should give true when fetched user is belong to labelInfo', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61cd183582547e820aff07f8')
            .set({ authorization: token })
            .send({labelName : "karan"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('Should give true when new label is created', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61cd183582547e820aff07f8')
            .set({ authorization: token })
            .send({labelName : "karan"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})

describe('get label  api ', () => {
    it('getlabel_by_checking_server', (done) => {
        chai
            .request(server)
            .get('/getlabel')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('it should give true when token is decoded', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .get('/getlabel')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should give false when token is invalid', (done) => {
        const token = labelDB.label.invalidToken;
        chai
            .request(server)
            .get('/getlabel')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('it should give false when userid is not validate', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .get('/getlabel')
            .set({ authorization: token })
            .send({ id: "61cc41d4db10efa515b4e1e8" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
    it('Should return true from GetLabel API Service Layer ,return appropriate response" ', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .get('/getlabel')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
    it('Should return true from GetLabel API model Layer ,return appropriate response" ', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .get('/getlabel')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
    it('Should return true when Label is added and manage user condition', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .get('/getlabel')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
})

describe('get label_by id api ', () => {
    it('getlabel_by_id_checking_server', (done) => {
        chai
            .request(server)
            .get('/getlabel/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('it should give true when ,add controller layer and checking the response of token in getlabel_by_id_', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .get('/getlabel/61cfd6c0209440838069fbeb')
            .set({authorization : token})
            .end((err, res) => {
                res.should.have.status(201);
                    done();
                });
    });
    it('it should give false when ,add controller layer and checking response by of invalid token in getlabel_by_id_', (done) => {
        const token = labelDB.label.invalidToken
        chai
            .request(server)
            .get('/getlabel/:id')
            .set({authorization: token})
            .end((err, res) => {
                res.should.have.status(400);
                    done();
                });
    });
    it('it should give true when ,Credential is Validated in getlabel_by_id_', (done) => { 
        const token = labelDB.label.validToken
        chai
            .request(server)
            .get('/getlabel/61cfd6c0209440838069fbeb')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                    done();
                });
    });
    it('it should give true when , Added Servce layer in getlabel_by_id_', (done) => { 
        const token = labelDB.label.validToken
        chai
            .request(server)
            .get('/getlabel/61cfd6c0209440838069fbeb')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                    done();
                });
    });
    it('it should give true when , Added Model layer in getlabel_by_id_', (done) => { 
        const token = labelDB.label.validToken
        chai
            .request(server)
            .get('/getlabel/61cfd6c0209440838069fbeb')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                    done();
                });
    });
    it('it should give true when , check response with valid Param and findng the label with label id ', (done) => { 
        const token = labelDB.label.validToken
        chai
            .request(server)
            .get('/getlabel/61cfd6c0209440838069fbeb')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                    done();
                });
    });
})

describe('update label_by id api ', () => {
    it('it should give true when,token is valid ', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .put('/updatelabel/61cfd6cb209440838069fbf1')
            .set({authorization : token})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should give true when,token is not decoded ', (done) => {
        const token = labelDB.label.invalidToken
        chai
            .request(server)
            .put('/updatelabel/:id')
            .set({authorization : token})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('it should give true when true params is validate', (done) => {
        const token = labelDB.label.invalidToken
        chai
            .request(server)
            .put('/updatelabel/61cfd6cb209440838069fbf1')
            .set({authorization : token})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('it should give false when Something is Wrong with credential ,Validation Failed ', (done) => {
        const token = labelDB.label.invalidToken
        chai
            .request(server)
            .put('/updatelabel/61cfd6c0209469fbeb')
            .set({authorization : token})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('it should give true when labelName is Valdated with Credential ', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .put('/updatelabel/61cfd6cb209440838069fbf1')
            .set({authorization : token})
            .send({labelName : 'Jaswinder'})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should give true when Service Layer is Added ', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .put('/updatelabel/61cfd6cb209440838069fbf1')
            .set({authorization : token})
            .send({labelName : 'Jaswinder'})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should give true when Model Layer is Added ', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .put('/updatelabel/61cfd6cb209440838069fbf1')
            .set({authorization : token})
            .send({labelName : 'Jaswinder'})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should give true when label is Updated is Succesfully ', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .put('/updatelabel/61cfd6cb209440838069fbf1')
            .set({authorization : token})
            .send({labelName : 'Jaswinder'})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    }); 
})

