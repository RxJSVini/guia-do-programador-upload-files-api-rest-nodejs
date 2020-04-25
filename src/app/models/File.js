/* Model para uploud de arquivos */

const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    name: String,
    path: String
}, {
    toJSON: {
        virtuals: true
    }
});

/*Gerando um URL para acessarmos os arquivos no servidor atraves do navegador */

FileSchema.virtual('url').get(function() {
    return `http://localhost:3002/files/${this.path}`
})

module.exports = mongoose.model('File', FileSchema)