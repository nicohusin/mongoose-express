require('dotenv').config()

module.exports = {
  MONGOOSE_DB : process.env.MONGOOSE_DB,
  Port : process.env.PORT,
  MONGOOSE_CONNECTION: process.env.MONGOOSE_CONNECTION
  
};