const { logger } = require('../../logger/logger');
const noteModel = require('../models/crud.notes');

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
  getNoteById = (id ,callback)=>{
    noteModel.getNoteById(id, (error, data) => {
      if (data) {
        callback(null, data);
      }
      else {
        callback(error, null);
      }
    })
  }
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
  deleteNoteById =(id,callback) => {
    noteModel.deleteNoteById(id ,(error,data)=>{
      if(error){
        return callback(error,null);
      }
      return callback(null,data);
    });
  };
}

module.exports = new Service();