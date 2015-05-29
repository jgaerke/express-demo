var self = {
  dataFile: process.env.DATA_FILE || 'Data.json',

  isAccessLoggingEnabled: process.env.ACCESS_LOGGING_ENABLED || true,

  isErrorLoggingEnabled: process.env.ERROR_LOGGING_ENABLED || true,

  isInfoLoggingEnabled: process.env.INFO_LOGGING_ENABLED || true
};

module.exports = self;