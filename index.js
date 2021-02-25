const
    Server = require('./lib/purratz.server'),
    ctrl = require('./lib/purratz.controller'),
    Service = require('./lib/purratz.service'),
    { getRandomInt, shuffle, ALPHABET, NUMBERS } = require('./lib/utils/shuffle'),
    emailValidator = require('./lib/utils/emailValidator'),
    pagination = require('./lib/utils/pagination');

module.exports = {
    Server,
    Ctrl: new ctrl,
    ctrl,
    Service,
    getRandomInt,
    shuffle,
    ALPHABET,
    NUMBERS,
    emailValidator,
    pagination
};