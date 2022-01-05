const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

// create express app
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// parse requests of content-type - application/json
app.use(express.json());

// Configuring the database
const dbsconnection = require('./config/database.config.js');

// Connecting to the database

dbsconnection.connection();
// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to fundooNotes App. Organize and keep track of all your notes."});
});
// Require Notes routes
require('./App/routes/note.routes.js')(app);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is listening");
});
module.exports = app