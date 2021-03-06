/*************************************************************************
* Purpose : to recieve request from routes and forward it to service layer
*
* @file : notes.controller.js
* @author : Jaswinder Singh  <findjassi1212@gmail.com>
* @version : 1.0
* 
*
**************************************************************************/
const { logger } = require('../../logger/logger');
const noteService = require('../service/notes.service.js');
const validation = require('../utilities/validation')

class Note {
  /**
   * @description function written to create notes into the database
   * @param {*} a valid req body is expected
   * @param {*} res
   * @returns response
   */
  createNote = async (req, res) => {
    try {
      if (req.user) {
        const note = {
          userId: req.user.decodedtoken.id,
          title: req.body.title,
          description: req.body.description
        };
        const createNoteValidation = validation.notesCreationValidation.validate(note);
        if (createNoteValidation.error) {
          return res.status(400).send({
            success: false,
            message: 'Wrong Input Validations',
            data: createNoteValidation
          });
        }
        let addnote = await noteService.createNote(note)
        if (!addnote) {
          logger.error('failed to post note');
          return res.status(400).json({
            message: 'failed to post note',
            success: false
          })
        } logger.info('Successfully inserted note');
        return res.status(201).send({
          message: 'Successfully inserted note',
          success: true,
          data: addnote
        });
      }
    } catch (error) {
      logger.error('Internal Error');
      return res.status(500).json({
        message: 'Internal Error'
      });
    }
  }

  /**
   * @description function written to get all the notes from the database
   * @param {*} req
   * @param {*} res
   * @returns response
   */
  findNote = async (req, res) => {
    try {
      const id = { id: req.user.decodedtoken.id };
      const getNoteValidation = validation.NoteValidation.validate(id);
      if (getNoteValidation.error) {
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: getNoteValidation
        });
      }
      let findnote = await noteService.findNote(id)
      if (!findnote) {
        logger.error('Failed to get all notes');
        return res.status(400).json({
          message: 'failed to get all notes',
          success: false
        })
      }
      logger.info('Get All Notes successfully');
      return res.status(201).json({
        message: 'Get All Notes successfully',
        success: true,
        data: findnote
      })
    }
    catch (err) {
      logger.error('Internal Error');
      return res.status(500).json({
        message: 'Internal Error',
        err: err
      });
    }
  }

  /**
   * @description function written to get notes id from the database
   * @param {*} req
   * @param {*} res
   * @returns response
   */
  findNoteById = async (req, res) => {
    try {
      if (req.user) {
        const noteInfo = { userId: req.user.decodedtoken.id, noteId: req.params.id };
        const getNoteValidation = validation.getNoteValidation.validate(noteInfo);
        if (getNoteValidation.error) {
          return res.status(400).send({
            success: false,
            message: 'Wrong Input Validations',
            data: getNoteValidation
          });
        }
        let findnotebyId = await noteService.findNoteById(noteInfo)
        if (!findnotebyId) {
          logger.error(error)
          return res.status(404).json({
            message: 'Note not found',
            success: false
          });
        }
        logger.info('Get Note _id successfully');
        return res.status(200).json({
          message: 'Note retrieved succesfully',
          success: true,
          data: findnotebyId

        });
      }
    }
    catch (err) {
      logger.error("error");
      return res.status(500).json({
        message: 'Internal Error',
        success: false,
        data: err
      });
    }
  };
  /**
   * @description function written to Update notes id from the database
   * @param {*} req
   * @param {*} res
   * @returns response
   */
  updateNoteById = (req, res) => {
    try {
      const updateNote = {
        id: req.params.id,
        userId: req.user.decodedtoken.id,
        title: req.body.title,
        description: req.body.description
      };

      const updateNoteValidation = validation.notesUpdateValidation.validate(updateNote);
      if (updateNoteValidation.error) {
        logger.error(updateNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          error: updateNoteValidation.error
        });
      }
      noteService.updateNoteById(updateNote, (error, data) => {
        if (error) {
          logger.error(error);
          logger.error('failed to update note');
          return res.status(400).json({
            message: 'failed to update note',
            success: false
          });
        } else {
          logger.info('Successfully Update note');
          return res.status(201).send({
            message: 'Successfully update note',
            success: true,
            data: data
          });
        }
      });
    } catch (error) {
      logger.error('Internal server error');
      return res.status(500).json({
        message: 'Error occured',
        success: false
      });
    }
  }
  /**
   * @description function written to delete note by id from the database
   * @param {*} req
   * @param {*} res
   * @returns response
   */
  deleteNoteById = (req, res) => {
    try {
      const id = { userId: req.user.decodedtoken.id, noteId: req.params.id };
      const deleteNoteValidation = validation.validateDeleteNote.validate(id);
      if (deleteNoteValidation.error) {
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: deleteNoteValidation
        });
      }
      noteService.deleteNoteById(id)
        .then(() => {
          return res.status(204).send({
            // message: 'Successfully Deleted note',
            // success: true,
            // data:data
          });
        }).catch(error => {
          return res.status(400).json({
            message: 'Note not found', error,
            success: false
          });
        })
    } catch (error) {
      logger.error('Internal server error');
      return res.status(500).json({
        message: 'Internal Server Error',
        success: false
      });
    }
  }
}
module.exports = new Note();