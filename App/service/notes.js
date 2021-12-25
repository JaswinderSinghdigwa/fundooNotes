const { logger } = require('../../logger/logger');
const noteModel = require('../models/notes');

class Service {
  /**
    * @description this function is written to send data models
    * @param {*} A valid note is expected
    * @returns error if it has error else data
    */
  createNote = (note, callback) => {
    noteModel.createNote(note, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  }
  
  getNote = (id, callback) => {
    noteModel.getNote(id, (error, data) => {
      if (data) {
        callback(null, data);
      }
      else {
        callback(error, null);
      }
    });
  };
  getNoteById = (id, callback) => {
    noteModel.getNoteById(id, (err, data) => {
      if (data) {
        return callback(null, data)
      } else {
        logger.error(error);
        return callback(err, null)
      }
    });
  };
  updateNoteById = (updateNote, callback) => {
    noteModel.updateNoteById(updateNote, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    }
    );
  };
  deleteNoteById = (deleteNote,callback)=>{
    if(!deleteNote){
      callback("Note is not Found",null);
    }
    callback(null,deleteNote);
  };
}

module.exports = new Service();