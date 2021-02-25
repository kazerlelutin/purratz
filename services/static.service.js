const fs = require('fs');
const Service = require('./../lib/purratz.service');

class StaticService extends Service {
    serve(funcServe) {
        let fileType;
        const extArr = this.ctx.params.file.split('.'),
            extension = extArr[1];
        switch (this.ctx.params.folder) {
            case 'style':
                fileType = "text/";
                break;
            case 'audio':
                fileType = "audio/";
                break;
            case 'video':
                fileType = "video/";
                break;
            case 'image':
                fileType = "image/";
                break;
            default:
                fileType = "text/";
                break;
        }
        this.ctx.type = extension ? fileType + extension : fileType + 'plain';

        if(typeof funcServe === 'function'){funcServe(this.ctx)}
        return fs.readFileSync(`./public/${this.ctx.params.folder }/${ this.ctx.params.file}`)
    }
}

module.exports = StaticService;