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
const NoteRegister = require('./notes.model').Note;
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
                    noteId: labelInfo.noteId,
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
                label.findOneAndUpdate({ userId: labelInfo.userId, labelName: labelInfo.labelName }, { $addToSet: { noteId: [labelInfo.noteId] } })
                    .then(data=>{
                        return callback(null, data)
                    }).catch(error=>{
                        return callback(error,null)
                    })
                }
        })
    }
    // Retrieve all labels
    findAllLabel = async (userId) => {
        let findlabel = await label.find({ userId: userId.id })
        try{
            if (!findlabel) {
                return false;
            }
            return findlabel;
        }
        catch(error){
            logger.error("Error Occured while finding Label");
        }
       
    }

    // Retrieve labels by id
    findlabelById = (credential) => {
        return new Promise((resolve, reject) => {
            label.find({ userId: credential.userId, _id: credential.labelId })
                .then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
        })
    }

    updatelabelById = async (updtlabel) => {
        let updatelabel = await label.findByIdAndUpdate(updtlabel.id, { labelName: updtlabel.labelName }, { new: true })
        try{
            if (!updatelabel) {
            return false
        }
        return updatelabel
        }
        catch(error){
            logger.error("Error Occured while finding Label");
        }
    }

    deleteLabel = async (credential) => {
        let deletedlabel = await label.findOneAndDelete(credential.id, { userId: credential.userId })
        try{
            if (!deletedlabel) {
            return false;
        }
        return {};
        }
        catch(error){
            logger.error("Error Occured while finding Label");
        }
    }
}
module.exports = new LabelModel();