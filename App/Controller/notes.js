const { logger } = require('../../logger/logger');
const noteService = require('../service/notes.js');
const validation = require('../utilities/validation')

class Note {
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
}
module.exports = new Note();