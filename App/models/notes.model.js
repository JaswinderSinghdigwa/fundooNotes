/**
 * @module      :  Models
 * @file        :  User.model.js
 * @description :  Taking the request from the client and gives the response
 * @author      :  Jaswinder Singh
 */

const { logger } = require('../../logger/logger');
const mongoose = require('mongoose');
const { db } = require('./otp.model');
const noteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String
  },
  description: {
    type: String,
    required: true,
    minlength: 2
  }
}, {
  timestamps: true
});

const NoteRegister = db.model('NoteRegister', noteSchema)

class Model {
  /**
 * @description function written to create notes into database
 * @param {*} a valid info is expected
 * @returns saved data or if error returns error
 */
  createNote = async (info) => {
    const note = new NoteRegister({
      userId: info.userId,
      title: info.title,
      description: info.description
    });
    let addnote = await note.save()
    try {
      if (!addnote) {
        return false;
      }
      return addnote
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

/**
 * @description function written to get all notes from database
 * @returns retrieved notes or if error returns error
 */
 findNote = async (id) => {
  let findnote = await NoteRegister.find({ userId: id.id })
    if (!findnote) {
      return false
    }
    return findnote;
 }

/**
 * @description function written to getnotes by id from database
 * @returns retrieved notes or if error returns error
 */
findNoteById = async (id) => {
  let findnote = await NoteRegister.find({ $and: [{ _id: id.noteId }, { userId: id.userId }] })
  if (!findnote) {
    return false
  }
  return findnote
}

/**
 * @description function written to updateNotes by id from database
 * @returns retrieved notes or if error returns error
 */
updateNoteById = (updatedNote, callback) => {
  NoteRegister.findByIdAndUpdate(updatedNote.id, { title: updatedNote.title, description: updatedNote.description }, { new: true }, (err, data) => {
  if (err) {
        return callback(err, null);
      } else if(!data){
        return callback("data is not  found", data);
      }
      return callback(null,data)
    });
  }

/**
 * @description function written to DeleteNotes by id from database
 * @returns retrieved notes or if error returns error
 */
deleteNoteById = (id) => {
  return new Promise((resolve, reject) => {
    NoteRegister.findOneAndDelete({ $and: [{ _id: id.noteId }, { userId: id.userId }] })
      .then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
  })
}
}
module.exports = {
  Model: new Model(),
  Note: NoteRegister
}; 