const note = require('../Controller/crud.notes.js')
const controller = require('../Controller/note.controller.js');
const helper = require('../utilities/helper.js');
const { not } = require('joi');

module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
  // api for login
  app.post('/login', controller.login);
  // api for forget pasword
  app.post('/forgotPassword', controller.forgotPassword);
  // api for Reset password
  app.put('/reset-Password', controller.resetPassword);
  // api for Create Note 
  app.post('/createnotes',helper.validateToken,note.createNote);
   // api for getnote
  app.get('/getnotes', helper.validateToken, note.getNote);
   // api for getnotes Id 
   app.get('/getnotes/:id', helper.validateToken, note.getNoteById);
   // api for updatenotes Id 
   app.put('/updatenotes/:id', helper.validateToken, note.updateNoteById); 
   // api for delete By Id 
   app.delete('/deletenotes/:id', helper.validateToken, note.deleteNoteById);
}; 