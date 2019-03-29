var appRoot = require('app-root-path');
var winston = require('winston');

//configuration setting for transports
var options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      timestamp : true
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

  var logger ;
 //instantiate logger 
 (function createLogger(){
 logger = new winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });

  winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'cyan'
});
})();

//write output to the file
  logger.stream = {
    write: function(message, encoding) {
      logger.info(message);
    },
  };

  module.exports = logger;