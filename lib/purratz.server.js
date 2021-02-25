require('dotenv').config();
const
    Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    cors = require('@koa/cors'),
    ctrl = require('./purratz.controller');

class purratz {
    constructor() {
        this.koa = new Koa();
        this.listen()
    }

    autoConfig() {
        this.cors({ credentials: true });
        this.bodyParser(['json', 'text', 'form']);
    }

    listen() { return this.koa.listen(process.env.PORT ? process.env.PORT : '3005')}

    staticCtrl(funcService){
        const Ctrl = new ctrl();
        const  StaticService = require('../services/static.service');
        Ctrl.initService(StaticService);
        Ctrl.get('/:folder/:file', _=> Ctrl.service().serve(funcService));
        this.koa.use(Ctrl.export('/public'))
    }

    use(func) {return this.koa.use(func)}
    bodyParser(options) { return this.koa.use(bodyParser({ enableTypes: options }))}
    cors(options) {return this.koa.use(cors(options))}
    addRoutes(ctrl) {
        Array.isArray(ctrl) ?
            ctrl.forEach(ct => this.koa.use(ct)) :
            this.koa.use(ctrl);
    }
}
module.exports = new purratz();