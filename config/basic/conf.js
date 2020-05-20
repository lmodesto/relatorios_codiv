const basicAuth = require('express-basic-auth');
require('dotenv/config');

module.exports = function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, process.env.USER)
    const passwordMatches = basicAuth.safeCompare(password, process.env.PASSWORD) 
    return userMatches & passwordMatches
}

