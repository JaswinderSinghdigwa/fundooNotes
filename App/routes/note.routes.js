/**
 * @module       routes
 * @file         user.routes.js
 * @description  API Routing
 * @author       Jaswinder Singh
 */

const note = require('../Controller/notes.controller')
const controller = require('../Controller/user.controller..js');
const helper = require('../utilities/global.helper.js');
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
  app.post('/note', helper.decodeToken,note.createNote);
   // api for getnote
  app.get('/notes', helper.decodeToken, note.findNote);
   // api for getnotes Id .. puting route name note instead of notes not working in swagger 
   app.get('/notes/:id', helper.decodeToken, note.findNoteById);
   // api for updatenotes Id 
   app.put('/updatenotes/:id', helper.decodeToken, note.updateNoteById); 
   // api for delete By Id 
   app.delete('/note/:id', helper.decodeToken, note.deleteNoteById);
   // api for Add Label By Id 
   app.post('/note/label/:id', helper.decodeToken, labelController.addLabel);
   // api for get Label  
   app.get('/labels', helper.decodeToken, labelController.findAlllabel);
   // api for get Label ..puting route name note instead of notes not working in swagger 
   app.get('/notes/labels/:id', helper.decodeToken, labelController.findlabelById);
   // api for Update Label by id 
   app.put('/notes/label/:id', helper.decodeToken, labelController.updatelabelById);
    // api for Delete Label by Id  
   app.delete('/note/labels/:id', helper.decodeToken, labelController.deletelabelById);

   app.get('/confirmRegister/:token', controller.confirmRegister)
}; 