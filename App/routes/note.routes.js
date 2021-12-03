const controller = require('../Controller/note.controller.js');
const helper = require('../utilities/helper.js');

module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
  // api for login
  app.post('/login', controller.login);
} 