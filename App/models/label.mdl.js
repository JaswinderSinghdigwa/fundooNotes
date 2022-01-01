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
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

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
        const findNotes = NoteRegister.find({ email: labelInfo.email, _id: labelInfo.noteId })
        if (findNotes.length === 0) {
            return callback('This note is not exist or this belongs to another user', null);
        }
        label.find({ userId: labelInfo.userId, labelName: labelInfo.labelName }, (error, data) => {
            if (!data || data.length === 0) {
                const labelmodel = new label({
                    userId: labelInfo.userId,
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
                label.findOneAndUpdate({ userId: labelInfo.userId, labelName: labelInfo.labelName }, { $addToSet: { noteId: [labelInfo.noteId] } }, (error, data) => {
                    if (error) {
                        callback(error, null)
                    }
                    else if (!data) {
                        logger.info("label is  not found");
                        return callback('label is  not found', data)
                    }
                    else {
                        return callback(error, data)
                    }
                })
            }
        })
    }
    // Retrieve all labels
    getLabel = (userId) => {
        return new Promise((resolve, reject) => {
            label.find({ userId: userId.id })
                .then((data) => {

                    resolve(data)
                }).catch((error) => {

                    reject(error)
                })
        })
    }
    // Retrieve labels by id
    getlabelById = (credential) => {
        return new Promise((resolve, reject) => {
            label.find({ userId: credential.userId, _id: credential.labelId })
                .then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
        })
    }
}
module.exports = new LabelModel();