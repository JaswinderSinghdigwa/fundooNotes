/*************************************************************************
* Purpose : to recieve request from service layer and then query DB
*
*
* @file : label.service.js
* @author : Jaswinder Singh <findjassi121212@gmail.com>
* @version : 1.0
* @since : 29/12/2021
*
**************************************************************************/
const NoteRegister = require('../models/notes.model').Note;
const mongoose = require('mongoose');

const labelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

    noteId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'note'
        }],

    labelName: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const label = mongoose.model('label', labelSchema);

class LabelModel {
    
    /**
	 * @description Create a new label
	 * @method  finds note with specific Id
	 */

    addLabel = (labelInfo, callback) => {
        const findNotes = NoteRegister.find({ email: labelInfo.email,_id: labelInfo.noteId });
                if (findNotes.length === 0) {
                    return callback('This note is not exist or this belongs to another user',null);
                }
                const findlabel = label.find({ userId: labelInfo.id, labelName: labelInfo.labelname });
                if (findlabel.length !== 0) {
                  return callback("the fetched userId is match with label",labelInfo.userId)
                }
    }
}

module.exports = new LabelModel();