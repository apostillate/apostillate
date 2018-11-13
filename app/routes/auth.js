//
const passport = require('passport');
const {
    existingUserValidator,
    newUserValidator
} = require('../middlewares/userValidator');
const isUserAuth = require('../middlewares/isUserAuth');
const {
    createUser,
    createRegisterEntry
} = require('../actions/auth');
//
const app = module.exports = require('express')();



app.post('/login', passport.authenticate('local'), (req, res) => {
    return res.send("Autenticación exitosa");
});
app.post('/register/existing', existingUserValidator, async (req, res) => {
    createUser(req.userData).then(() => {
        console.log("Usuario registrado exitosamente");
        res.status(200).end();
    }).catch(error => {
        console.log(error);
        res.status(error.status).send(error.message);
    })
});
app.post('/register/new', newUserValidator, async (req, res) => {
    createUser(req.userData).then(() => {
        console.log("Usuario registrado exitosamente");
        createRegisterEntry(req.registerData).then(() => {
            res.status(200).end();
        }).catch(error => {
            console.log(error);
            res.status(error.status).send(error.message);
        })
    }).catch(error => {
        console.log(error);
        res.status(error.status).send(error.message);
    })
});
app.post('/dashboard', isUserAuth, (req, res) => {
    res.send(req.user);
})