const controller = require('../Controller/note.controller.js');
const helper = require('../utilities/helper.js');

module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
  // api for login
  app.post('/login', controller.login);
  // api for dashboard
  app.get('/api/dahsboard',controller.ensuretoken,helper.dashboardControl);
} 