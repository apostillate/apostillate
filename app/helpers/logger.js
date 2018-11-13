const winston = require('winston');
const getLabel = function (callingModule) {
    var parts = callingModule.filename.split('/');
    return parts[parts.length - 2] + '/' + parts.pop();
};

module.exports = function (callingModule) {
    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                label: getLabel(callingModule),
                json: false,
                timestamp: false,
                depth:true,
                colorize:true
            })
        ]
    });
};