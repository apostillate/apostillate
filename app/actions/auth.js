//
const validator = require('validatorjs');
const bcrypt = require('bcrypt-nodejs');
const connection = require('../middlewares/database');
const {queryHolders,queryKeys} = require('../helpers/queryHelper');
//
module.exports = {
    createUser: userData => {
        return new Promise((resolve, reject) => {
            const dataKeys = Object.keys(userData);
            userData.userPass = bcrypt.hashSync(userData.userPass);
            const dataValues = Object.values(userData);
            const insertQuery = `INSERT INTO users ( ${queryKeys(dataKeys)} ) VALUES (${queryHolders(dataValues.length)})`;
            connection.query(insertQuery, dataValues, function(error, results) {

                if (error) {
                    if (error.code == 23505) {
                        if (error.constraint === 'users_pkey') {
                            return reject({
                                status: 409,
                                message: "E-mail ya ha sido registrado"
                            });
                        }
                        return reject({
                            status: 409,
                            message: "Cédula ya ha sido registrada"
                        });
                    } else {
                        console.log(error.code)
                        return reject({
                            status: 500,
                            message: error
                        });
                    }
                }
                return resolve();
            });
        });
    },
    createRegisterEntry: userData => {
        return new Promise((resolve, reject) => {
            const dataKeys = Object.keys(userData);
            const dataValues = Object.values(userData);
            const insertQuery = `INSERT INTO operations ( "userEmail", "operationType", "operationDate" ) VALUES ($1,$2,now())`;
            connection.query(insertQuery, [userData.userEmail, "Registro"], function(error, results) {
                if (error) {
                    return reject({
                        status: 500,
                        message: error
                    })
                }
                const insertQuery = `INSERT INTO register_list ( ${queryKeys(dataKeys)} ) VALUES (${queryHolders(dataValues.length)})`;
                connection.query(insertQuery, dataValues, function(error, results) {
                    if (error) {
                        return reject({
                            status: 500,
                            message: error
                        })
                    }
                    resolve();
                });
            });
        });
    }
}