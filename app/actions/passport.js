//
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const connection = require('../middlewares/database');
//
module.exports = {
    authStrategy: new LocalStrategy({
        usernameField: 'userEmail',
        passwordField: 'userPass'
    }, (email, password, done) => {
        connection.query(`SELECT * FROM users WHERE "userEmail" = $1`, [email], function(error, results) {
            if (error) return done(error);
            if (!results.rows[0]) {
                return done(null, false, {
                    message: "No existe un usuario con dicho E-mail"
                }); // req.flash is the way to set flashdata using connect-flash
            }
            // if the user is found but the password is wrong
            if (!bcrypt.compareSync(password, results.rows[0].userPass)) return done(null, false, {
                message: "La contraseña almacenada es incorrecta"
            }); // create the loginMessage and save it to session as flashdata
            // all is well, return successful user
            return done(null, results.rows[0]);
        });
    }),
    serializeUser: (user, done) => {
        done(null, user.userEmail);
    },
    deserializeUser: (id, done) => {
        connection.query(`SELECT 
            users.*, operations."operationType"
            FROM
            users
                INNER JOIN
            operations ON users."userEmail" = operations."userEmail"
            WHERE(users."userEmail" = $1)`, [id], function(error, results) {
            if (error) return done(error);
    
            if (!results.rows[0]) {
                return done(null, false, {
                    message: "Usuario ya no existe"
                }); // req.flash is the way to set flashdata using connect-flash
            }
            // create the loginMessage and save it to session as flashdata
            // all is well, return successful user
            return done(null, results.rows[0]);
        });
    }
}