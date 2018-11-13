/*const mysql = require('mysql');
const connection = require('mysql').createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "apos_bot",
    dateStrings: true
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
*/
var pg = require('pg');
var pool = new pg.Pool();
module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
    pool: pool
}