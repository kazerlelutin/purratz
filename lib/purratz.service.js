class purratzService {
    constructor(ctx, next) {
        this.ctx = ctx;
        this.next = next;
        this.params = ctx.params
    }

    dto(dto) {
        let count = 0;
        const
            obj = {...this.ctx.request.body},
            objKeys = Object.keys(dto);
        Object.keys(obj).forEach( key => {
            if(!dto.hasOwnProperty(key)){delete obj[key]}
        });
        objKeys.forEach( key => {
            if(dto[key].hasOwnProperty('isRequired')){
                if(!obj.hasOwnProperty(key)){count++}
            }

            if(typeof dto[key] === 'string'){
                if(dto[key] === 'array'){
                    if(!Array.isArray(obj[key])){count++}
                } else if((dto[key] !== typeof obj[key]) && obj[key]) {count++}

            } else {
                if(!dto[key].hasOwnProperty('type')){count++}
                if (dto[key].type !== typeof obj[key]){count++}
            }
        })
        return count ? false : obj
    }

    async withPromise(func) {
        return new Promise(resolve => {
            func
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    resolve(error);
                });
        })
    }
}
module.exports = purratzService;