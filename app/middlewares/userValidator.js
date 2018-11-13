//
const validator = require('validatorjs');
//
const userDataKeys = ["userName", "userEmail", "userPass", "userID"];
module.exports = {
    existingUserValidator: (req, res, next) => {
        const rules = {
            userName: "required|string",
            userEmail: "required|email",
            userPass: "required|string|min:6",
            userID: "required|integer"
        }
        const dataValidator = new validator(req.body, rules);
        if (dataValidator.passes()) {
            req.userData = {};
            userDataKeys.forEach(key => {
                req.userData[key] = req.body[key];
            })
            return next();
        }
        return res.status(422).send(dataValidator.errors.all());
    },
    newUserValidator: (req, res, next) => {
        const rules = {
            userName: "required|string",
            userEmail: "required|email",
            userAddress: "required",
            userCellPhone: "required",
            userID: "required|integer",
            userSecretQuestion1: "required",
            userSecretQuestionAnswer1: "required",
            userSecretQuestion2: "required",
            userSecretQuestionAnswer2: "required",
            userSecretQuestion3: "required",
            userSecretQuestionAnswer3: "required",
            userSecretQuestion4: "required",
            userSecretQuestionAnswer4: "required",
            userType: "required|in:natural,juridico"
        }
        if (req.body.userType === "natural") {
            rules.userLastname = "required|string",
                rules.userLocalPhone = "required",
                rules.userGender = "required|in:masculino,femenino",
                rules.userCivilianStatus = "required|in:soltero,casado,viudo",
                rules.userBirth = "required|date",
                rules.userNationality = "required"
        }
        const dataValidator = new validator(req.body, rules);
        if (dataValidator.passes()) {
            req.userData = {};
            req.registerData = {};
            userDataKeys.forEach(key => {
                req.userData[key] = req.body[key];
            })
            Object.keys(rules).forEach(key => {
                req.registerData[key] = req.body[key];
            })
            return next();
        }
        return res.status(422).send(dataValidator.errors.all());
    }
}