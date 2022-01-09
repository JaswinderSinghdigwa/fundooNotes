const { logger } = require('../../logger/logger');
const noteModel = require('../models/notes.model').Model;
const nodeRedis = require('../Connector/redis.connector');


class Service {
  /**
    * @description this function is written to send data models
    * @param {*} A valid note is expected
    * @returns error if it has error else data
    */
  createNote = async (note) => {
    let addnote = await noteModel.createNote(note)
    if (!addnote) {
      return false;
    }
    return addnote
  }

  findNote = async (id) => {
    let findnote = await noteModel.findNote(id)
    if (!findnote) {
      return false;
    }
    return findnote;
  }

  findNoteById = async (noteInfo) => {
    let data = await nodeRedis.findAllData('getById')
    if (!data) {
      let findnotebyId = await noteModel.findNoteById(noteInfo)
      if (!findnotebyId) {
        return false
      }
      return findnotebyId
    }
    nodeRedis.setData('getById', 60, JSON.stringify(data))
    return data;
  }


  updateNoteById = (updateNote, callback) => {
    noteModel.updateNoteById(updateNote, (err, data) => {
      if (err) {
        logger.error(err);
        return callback(err, null);
      } else {
        return callback(null, data);
      }
    })
  };

  deleteNoteById = (id) => {
    return new Promise((resolve, reject) => {
      noteModel.deleteNoteById(id)
        .then(() => {
          resolve({})
        }).catch(error => {
          reject(error)
        })
    })
  }
}

module.exports = new Service();