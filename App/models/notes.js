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
  getNote =   (id, callback) => {
    NoteRegister.find({userId: id.id}, (error, data) => {
      if (data) {
        console.log("111",data)
        callback(null,data);
      }
      else {
        callback(error, null);
      }
    });
  } 
}
module.exports = new Model();