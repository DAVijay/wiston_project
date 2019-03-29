require('dotenv').config(); // Sets up dotenv as soon as our application starts

// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Initialize the app
let app = express();

/// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());  

var winston = require('./config/user.logger');
var morgan = require('morgan');
app.use(morgan('combined'));

app.use(morgan('combined', { stream: winston.stream }));

// Connect to Mongoose and set connection variable
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

var db = mongoose.connection;
// Setup server port
const stage = require('./config/database.config');

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Wiston project'));

// Require Notes routes
require('./routes/user.routes.js')(app);

// Launch app to listen to specified port
app.listen(`${stage.development.port}`, function () {
    console.log("Running Wiston project on port " + `${stage.development.port}`);
});