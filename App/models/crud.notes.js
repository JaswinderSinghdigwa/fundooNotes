const { logger } = require('../../logger/logger');
const mongoose = require('mongoose');
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

const NoteRegister = mongoose.model('NoteRegister', noteSchema)

class Model {
  /**
 * @description function written to create notes into database
 * @param {*} a valid info is expected
 * @returns saved data or if error returns error
 */
  createNote = (info, callback) => {
    const note = new NoteRegister({
      userId: info.userId,
      title: info.title,
      description: info.description
    });
    note.save((error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  }

  /**
   * @description function written to get all notes from database
   * @returns retrieved notes or if error returns error
   */
  getNote = (id, callback) => {
    NoteRegister.findOne({ userId: id.id }, (error, data) => {
      if (data) {
        callback(null, data);
      }
      else {
        callback(error, null);
      }
    });
  }

  /**
   * @description function written to getnotes by id from database
   * @returns retrieved notes or if error returns error
   */
  getNoteById = (id, callback) => {
    NoteRegister.find({ $and: [{ _id: id.noteId }, { userId: id.userId }] })
      .then((data) => {
        callback(null, data)
      }).catch((err) => {
        callback(err, null)
      })
  };

  /**
   * @description function written to updateNotes by id from database
   * @returns retrieved notes or if error returns error
   */
  updateNoteById = (updatedNote, callback) => {
    try {
      NoteRegister.findByIdAndUpdate(updatedNote.id, { title: updatedNote.title, description: updatedNote.description }, { new: true }, (err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
    } catch (err) {
      return callback(err, null);
    }
  };

  /**
   * @description function written to DeleteNotes by id from database
   * @returns retrieved notes or if error returns error
   */
  deleteNoteById = (id, callback) => {
    NoteRegister.findOneAndDelete({ $and: [{ _id: id.noteId }, { userId: id.userId }] }, (error, data) => {
      if (data) {
        return callback(null, data);
      }
      return callback(error, null);
    })
  };
}
module.exports = new Model();