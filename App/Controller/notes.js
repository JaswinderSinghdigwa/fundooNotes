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
            console.log('note for controller :: ' + note.userId);
            noteService.createNote(note, (error, data) => {
                console.log("111",error,data);
                if (error) {
                    logger.error('failed to post note');
                    return res.status(400).json({
                        message: 'failed to post note',
                        success: false
                    });
                } else {
                    "title"
                    "description"
                    logger.info('Successfully inserted note');
                    return res.status(201).send({
                        message: 'Successfully inserted note',
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
     * @description function written to get all the notes from the database
     * @param {*} req
     * @param {*} res
     * @returns response
     */
     getNote = (req, res) => {
        try {
          const id = { id: req.user.dataForToken.id };
          noteService.getNote(id, resolve, reject);
          function resolve (data) {
            logger.info('Get All Notes successfully');
            return res.status(201).json({
              message: 'Get All Notes successfully',
              success: true,
              data: data
            });
          }
          function reject () {
            logger.error('Failed to get all notes');
            return res.status(400).json({
              message: 'failed to get all notes',
              success: false
            });
          }
        } catch {
          logger.error('Internal Error');
          return res.status(500).json({
            message: 'Internal Error'
          });
      }
    };
}
module.exports = new Note();