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
const NoteRegister = require('./notes.mdl').Note;
const mongoose = require('mongoose');
const { logger } = require('../../logger/logger')

const labelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    noteId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NoteRegister'
    }],

    labelName: {
        type: String,
        unique: true,
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
        const findNotes = NoteRegister.find({ email: labelInfo.email, userId: labelInfo.userId })
        if (findNotes.length === 0) {
            return callback('This note is not exist or this belongs to another user', null);
        }
        label.find({ userId: labelInfo.userId, labelName: labelInfo.labelName }, (error, data) => {
            if (!data) {
                const labelmodel = new label({
                    userId: labelInfo.id,
                    noteId: [labelInfo.noteId],
                    labelName: labelInfo.labelName,
                });
                labelmodel.save((error, data))
                    .then((data) => {
                        logger.info('Successfully added label !');
                        return callback(null, data)
                    }).catch((error) => {
                        logger.info('Some error occurred while adding label');
                        callback(error, null)
                    })
            } else if (data) {
                label.findOneAndUpdate({ labelName: labelInfo.labelName }, { $addToSet: { noteId: labelInfo.noteId } }, (error, data) => {
                    if (error) {
                        callback(error, null)
                    }
                    else if (!data) {
                        logger.log("label is  not found");
                        return callback("label is not found", data)
                    }
                    else {
                        logger.error(error);
                        return callback(error, data)
                    }
                })
            }
        })
    }
    getLabel = (userId, callback) => {
        if (!userId) {
            return callback("Service is not giving response", null);
        }else{
            return callback(null, userId);
        }
    }
}
module.exports = new LabelModel();