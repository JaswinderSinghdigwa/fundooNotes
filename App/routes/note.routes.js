/**
 * @module       routes
 * @file         user.routes.js
 * @description  API Routing
 * @author       Jaswinder Singh
 */

const note = require('../Controller/notes.controller')
const controller = require('../Controller/user.controller.js');
const helper = require('../utilities/helper.js');
const labelController = require('../Controller/label.controller')

module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
  // api for login
  app.post('/login', controller.login);
  // api for forgot pasword
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
   // api for Add Label By Id 
   app.post('/addlabel/:id', helper.validateToken, labelController.addLabel);
}; 