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
            .post('/note/label/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('Given Token shoule give true when token is valid', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .post('/note/label/61d88b04e6db75a4062bebe8')
            .set({ authorization: token })
            .send({labelName : "Jaswinder Singh"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Given Token Should give false when token is invalidtoken', (done) => {
        const token = labelDB.label.invalidToken
        chai
            .request(server)
            .post('/note/label/:id')
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
            .post('/note/label/61d88b04e6db75a4062bebe8')
            .set({ authorization: token })
            .send({labelName : "Jaswinder Singh"})
            .end((err, res) => {
                if (err) {
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
            .post('/note/label/61d88b04e6db75a4062bebe8')
            .set({ authorization: token })
            .send({ labelName: "karan" })
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
            .post('/note/label/61d88b04e6db75a4062bebe8')
            .set({ authorization: token })
            .send({ labelName: "karan" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('Should give true when note is belong to same user', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .post('/note/label/61d88b04e6db75a4062bebe8')
            .set({ authorization: token })
            .send({ labelName: "karan" })
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
            .post('/note/label/61d88b04e6db75a4062bebe8')
            .set({ authorization: token })
            .send({ labelName: "karan" })
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
            .post('/note/label/61d88b04e6db75a4062bebe8')
            .set({ authorization: token })
            .send({ labelName: "karan" })
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
            .get('/labels')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('it should give true when token is decoded', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .get('/labels')
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
            .get('/labels')
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
            .get('/labels')
            .set({ authorization: token })
            .send({ id: "61cc41d4db10efa515b4e1e8" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
    it('Should return true from GetLabel Service Layer ,return appropriate response" ', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .get('/labels')
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
            .get('/labels')
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
            .get('/labels')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
})

describe('get label_by id api ', () => {
  it('getLabelByID_checking_server', (done) => {
    chai
        .request(server)
        .get('/notes/labels/:id')
        .end((err, res) => {
            res.should.have.status(500);
            done();
        });
})
it('Should Gives true when token is verify', (done) => {
  const token = labelDB.label.validToken;
  chai
      .request(server)
      .get('/notes/labels/61d889a6a543c18ec872cd56')
      .set({ authorization: token })
      .end((err, res) => {
          res.should.have.status(201);
          done();
      });
});
    it('it should give false when ,add controller layer and checking response by of invalid token in getlabel_by_id_', (done) => {
      const token = labelDB.label.invalidToken;
      chai
          .request(server)
          .get('/notes/labels/:id')
          .set({ authorization: token })
          .end((err, res) => {
              res.should.have.status(400);
              done();
          })
    });
    it('it should give true when ,Credential is Validated in getlabel_by_id_', (done) => {
        const token = labelDB.label.validToken
        chai
        .request(server)
        .get("/notes/labels/61d889a6a543c18ec872cd56")
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
            .get('/notes/labels/61d88f9ed0018691b585e051')
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
            .get('/notes/labels/61d88f9ed0018691b585e051')
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
            .get('/notes/labels/61d88f9ed0018691b585e051')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
})

describe("Update Label", () => {
it("when call update label api, should return appropriate response from controller", (done) => {
    const token = labelDB.label.validToken
    chai
      .request(server)
      .put("/notes/label/61d88f9ed0018691b585e051")
      .set({ authorization: token })
      .send({ labelName: "Jaswinder" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });

  it("when call update label api, should return appropriate response from controller", (done) => {
    const token = labelDB.label.invalidToken;
    chai
      .request(server)
      .put("/notes/label/61d88f9ed0018691b585e051")
      .set({ authorization: token })
      .send({ labelName: "Jaswinder" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });

  it("check validation with true input, should return appropriate response from controller", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .put("/notes/label/61d88f9ed0018691b585e051")
      .set({ authorization: token })
      .send({ labelName: "Jaswinder" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });

  it("check validation with false labelName, should return appropriate response from controller", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .put("/notes/label/61d88f9ed0018691b585e051")
      .set({ authorization: token })
      .send({ labelName: "La" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(422);
        return done();
      });
  });

  it("check validation with false params, should return appropriate response from controller", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .put("/notes/label/61cc239e23cdf0")
      .set({ authorization: token })
      .send({ labelName: "Jas" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(422);
        return done();
      });
  });

  it("when call upgradeLabel api, should return appropriate response from service", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .put("/notes/label/61d88f9ed0018691b585e051")
      .set({ authorization: token })
      .send({ labelName: "JaswinderDigwa" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });

  it("when call upgradeLabel api, should return appropriate response from model", (done) => {
    const token = labelDB.label.validToken
    chai
      .request(server)
      .put("/notes/label/61d88f9ed0018691b585e051")
      .set({ authorization: token })
      .send({ labelName: "JaswinderSingh" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });

  it("check updation with true id, should return appropriate response from model", (done) => {
    const token = labelDB.label.validToken
    chai
      .request(server)
      .put("/notes/label/61d88f9ed0018691b585e051")
      .set({ authorization: token })
      .send({ labelName: "JaswinderSingh" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });

  it("check updation with false id, should return appropriate response from model", (done) => {
    const token = labelDB.label.validToken
    chai
      .request(server)
      .put("/notes/label/61d8a1c8bc569ceb4")
      .set({ authorization: token })
      .send({ labelName: "JaswinderSingh" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });

  it("check given details Clear old Cache after update with false input,Should return 400", (done) => {
    const token = labelDB.label.validToken
    chai
      .request(server)
      .put("/notes/label/61d8a1c8bc564679ca3")
      .set({ authorization: token })
      .send({ labelName: "JaswinderSingh" })
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });

  it("check given details Clear old Cache after update ,Should return 200", (done) => {
    const token = labelDB.label.validToken
    chai
      .request(server)
      .put("/notes/label/61d88f9ed0018691b585e051")
      .set({ authorization: token })
      .send({ labelName: "JaswinderSingh" })
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
});

describe("Delete Label", () => {
    it("when call delete label api, should return appropriate response from controller", (done) => {
        const token = labelDB.label.validToken;
        chai
        .request(server)
        .delete("/note/labels/61d88f9ed0018691b585e051")
        .set({ authorization: token })
        .end((err, res) => {
          if (err) {
            console.log("plz check your credential");
            return done();
          }
          res.should.have.status(200);
          return done();
        });
    });
  
    it("when call delete label api with false token, should return appropriate response from controller", (done) => {
        const token = labelDB.label.invalidToken;
        chai
        .request(server)
        .delete("/note/labels/61dada5994a1e60fc9c01e75")
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
  
    it("check validation with true params, should return appropriate response from controller", (done) => {
        const token = labelDB.label.validToken;
        chai
        .request(server)
        .delete("/note/labels/61dada5994a1e60fc9c01e75")
        .set({ authorization: token })
        .end((err, res) => {
          if (err) {
            console.log("plz check your credential");
            return done();
          }
          res.should.have.status(200);
          return done();
        });
    });
  
    it("check validation with null id, should return appropriate response from controller", (done) => {
        const token = labelDB.label.validToken;
        chai
        .request(server)
        .delete("/note/labels/:id")
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
  
    it("when call delete label api, should return appropriate response from service", (done) => {
        const token = labelDB.label.validToken;
        chai
        .request(server)
        .delete("/note/labels/61dada5994a1e60fc9c01e75")
        .set({ authorization: token })
        .end((err, res) => {
          if (err) {
            console.log("plz check your credential");
            return done();
          }
          res.should.have.status(200);
          return done();
        });
    });
  
    it("when call delete label api, should return appropriate response from model", (done) => {
        const token = labelDB.label.validToken;
        chai
        .request(server)
        .delete("/note/labels/61dada5994a1e60fc9c01e75")
        .set({ authorization: token })
        .end((err, res) => {
          if (err) {
            console.log("plz check your credential");
            return done();
          }
          res.should.have.status(200);
          return done();
        });
    });
  
    it("check with true id, should return appropriate response from model", (done) => {
        const token = labelDB.label.validToken;
        chai
        .request(server)
        .delete("/note/labels/61dada5994a1e60fc9c01e75")
        .set({ authorization: token })
        .end((err, res) => {
          if (err) {
            console.log("plz check your credential");
            return done();
          }
          res.should.have.status(200);
          return done();
        });
    });
  
    it("check with false id, should return appropriate response from model", (done) => {
      const token = labelDB.label.validToken;
      chai
        .request(server)
        .delete("/note/labels/61d88f9ed")
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
  });
