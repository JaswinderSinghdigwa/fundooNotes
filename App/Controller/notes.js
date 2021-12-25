const { logger } = require('../../logger/logger');
const noteService = require('../service/notes.js');
const validation = require('../utilities/validation')

class Note {
  /**
   * @description function written to create notes into the database
   * @param {*} a valid req body is expected
   * @param {*} res
   * @returns response
   */
  createNote = (req, res) => {
    try {
      const note = {
        userId: req.user.dataForToken.id,
        title: req.body.title,
        description: req.body.description
      };
      const createNoteValidation = validation.notesCreationValidation.validate(note);
      if (createNoteValidation.error) {
        console.log(createNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: createNoteValidation
        });
      }
      noteService.createNote(note, (error, data) => {
        if (error) {
          logger.error('failed to post note');
          return res.status(400).json({
            message: 'failed to post note',
            success: false
          });
        } else {
          logger.info('Successfully inserted note');
          return res.status(201).send({
            message: 'Successfully inserted note',
            success: true,
            data: data
          });
        }
      });
    } catch (error) {
      console.log("error", req)
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
  getNote = (req, res) => {
    try {
      const id = { id: req.user.dataForToken.id };
      const getNoteValidation = validation.NoteValidation.validate(id);
      if (getNoteValidation.error) {
        console.log(getNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: getNoteValidation
        });
      }
      noteService.getNote(id, (error, data) => {
        if (data) {
          logger.info('Get All Notes successfully');
          return res.status(201).json({
            message: 'Get All Notes successfully',
            success: true,
            data: data
          })
        }
        else {
          logger.error('Failed to get all notes');
          return res.status(400).json({
            message: 'failed to get all notes',
            success: false
          })
        }
      })
    }
    catch {
      logger.error('Internal Error');
      return res.status(500).json({
        message: 'Internal Error'
      });
    }
  }

  /**
   * @description function written to get notes id from the database
   * @param {*} req
   * @param {*} res
   * @returns response
   */
  getNoteById = (req, res) => {
    try {

      const id = { userId: req.user.dataForToken.id, noteId: req.params.id };

      const getNoteValidation = validation.getNoteValidation.validate(id);
      if (getNoteValidation.error) {
        console.log(getNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: getNoteValidation
        });
      }

      noteService.getNoteById(id, (err, data) => {
        if (err) {
          logger.error('Note is Found')
          return res.status(404).json({
            message: 'Note not found',
            success: false
          });
        }
        logger.info('Get Note _id successfully');
        return res.status(200).json({
          message: 'Note retrieved succesfully',
          success: true,
          data: data

        });
      });
    } catch (err) {
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
        userId: req.user.dataForToken.id,
        title: req.body.title,
        description: req.body.description
      };

      const updateNoteValidation = validation.notesUpdateValidation.validate(updateNote);
      if (updateNoteValidation.error) {
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: updateNoteValidation
        });
      }

      noteService.updateNoteById(updateNote, (error, data) => {
        if (error) {
          logger.error('failed to update note');
          return res.status(400).json({
            message: 'failed to update note',
            success: false
          });
        } else {
          logger.info('Successfully inserted note');
          return res.status(201).send({
            message: 'Successfully update note',
            success: true,
            data: data
          });
        }
      });
    } catch {
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
      if(req.user){
      return res.status(201).send({
        message: 'Successfully Deleted note',
        success: true
      });
    }else{
      logger.error('failed to Delete note');
      return res.status(400).json({
        message: 'failed to Delete note',
        success: false
      });
    }
    }catch(error){
      logger.error('Internal server error');
      return res.status(500).json({
          message: 'Internal Server Error',
          success: false
      });
    }
  }
}
module.exports = new Note();