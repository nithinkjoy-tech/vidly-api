const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  winston.add(winston.transports.File, {filename: "logfile.log"});

  winston.handleExceptions(
    new winston.transports.Console({colorize:true,prettyPrint:true}),
    new winston.transports.File({filename: "uncaughtExceptions.log"})
  );

  process.on("unhadledRejection", ex => {
    throw ex;
  });
};
