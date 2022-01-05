/**
 * @module       routes
 * @file         user.routes.js
 * @description  API Routing
 * @author       Jaswinder Singh
 */

const note = require('../Controller/notes.controller')
const controller = require('../Controller/user.controller..js');
const globalhelper = require('../utilities/global.helper.js');
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
  app.post('/note',globalhelper.decodeToken,note.createNote);
   // api for getnote
  app.get('/notes', globalhelper.decodeToken, note.findNote);
   // api for getnotes Id 
   app.get('/note/:id', globalhelper.decodeToken, note.findNoteById);
   // api for updatenotes Id 
   app.put('/note/:id', globalhelper.decodeToken, note.updateNoteById); 
   // api for delete By Id 
   app.delete('/note/:id', globalhelper.decodeToken, note.deleteNoteById);
   // api for Add Label By Id 
   app.post('/note/label/:noteid', globalhelper.decodeToken, labelController.addLabel);
   // api for get Label  
   app.get('/note/labels', globalhelper.decodeToken, labelController.findAlllabel);
   // api for get Label  
   app.get('/note/labels/:labelid', globalhelper.decodeToken, labelController.findlabelById);
   // api for Update Label by id 
   app.put('/note/labels/:labelid', globalhelper.decodeToken, labelController.updatelabelById);
    // api for Delete Label by Id  
   app.delete('/note/label/:labelid', globalhelper.decodeToken, labelController.deletelabelById);
}; 