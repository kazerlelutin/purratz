const Router = require("koa-router");

class purratzController {
    constructor() {
        this.ctrl = new Router();
        this.routes = new Router();
        this.init();
        this.guardService = null;
        this.cover = false
    }

    init() {
        this.ctrl.use(async (ctx, next) => {
            this.CTX = ctx;
            this.next = next;
            await next();
        });
    }

    initService(service) {
        this.ctrl.use(async (ctx, next) => {
            this.Service = new service(ctx, next);
            await next();
        });
    }

    initGuard(guard,cover) {
        this.ctrl.use(async (ctx, next) => {
            this.guardService = guard;
            this.cover = !!cover
            await next();
        });
    }

    async bodyGuard() {
        const GUARD = await this.guardService(this.CTX);
        if(typeof GUARD === "boolean"){
            if(!GUARD) {this.CTX.throw(401,"unauthorized")}
        } else if(typeof GUARD === "object" && GUARD.status && GUARD.status !== 200) {
            this.CTX.throw(GUARD.status , GUARD.message  ? GUARD.message : "unauthorized")
        }
    }

    async bodyResponse(service, guard) {
        if((guard && typeof guard === "boolean") || this.cover){await this.bodyGuard()}
        const response = await service(this.CTX, this.next);
        if (typeof response === 'object' && response.status && response.status !== 200) {
            response.message ?
                this.CTX.throw(response.status, response.message) :
                this.CTX.throw(response.status);
        }
        this.CTX.body = response;
    }
    ctx(payload) {
        const body = typeof payload === "function" ? payload() : payload;
        if (typeof body === 'object' && body.status) {
            this.CTX.status = body.status;
            delete body.status;
        }
        return this.CTX.body = body;
    }

    service() { return this.Service }

    guard(guard,cover) { return this.initGuard(guard, cover) }

    switcherRouter(method ,path, service,guard, middleware){
        const checkArgs = this.routeParse(path,service,guard,middleware);
        switch (checkArgs) {
            case 'full':
                return this.routes[method](path,middleware,
                    _ => this.bodyResponse(service, guard));
            case 'guard without middleware':
                return this.routes[method](path,
                    _ => this.bodyResponse(service, guard));
            case 'middleware without guard':
                return this.routes[method](path,guard,
                    _ => this.bodyResponse(service));
            default:
                return this.routes[method](path,
                    _ => this.bodyResponse(service));
        }
    }

    routeParse(path, service, guard, middleware){
        if(typeof arguments[1] === "function" &&
            typeof arguments[2] === "boolean" &&
            typeof arguments[3] === "function" ){
            return "full"}
        if(typeof arguments[2] === "boolean" && typeof arguments[3] !== "function"){
            return "guard without middleware"
        }
        if(typeof arguments[2] === "function" && typeof arguments[3] !== "function"){
            return "middleware without guard"
        }
        return "path and service"
    }

    get(path, service, guard, middleware) {
        return this.switcherRouter('get',  path, service, guard, middleware)
    }

    post(path, service, guard, middleware) {
        return this.switcherRouter('post',  path, service, guard, middleware)
    }

    put(path, service, guard, middleware) {
        return this.switcherRouter('put',  path, service, guard, middleware)
    }

    delete(path, service, guard, middleware) {
        return this.switcherRouter('delete', path, service, guard, middleware)
    }

    export(path) { return this.ctrl.use(path, this.routes.routes(), this.routes.allowedMethods()).routes(); }
}

module.exports = purratzController;