const  path  = require("path")
const multer = require("multer")
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp") //sai desta pasta sai do src e pega a pasta da raiz tmp
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads") 

const MULTER = { //O MULTER É RESPONSAVEL PELO UPLOAD DO ARQUIVO
    storage: multer.diskStorage({ 
        destination: TMP_FOLDER, // pasta que vai receber
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex"); //cria o nome para o arquivo da pasta
            const fileName = `${fileHash}-${file.originalname}`; //ajuda a manter o nome único cobinando o nome do arquivo

            return callback(null, fileName);
        }
    })
}

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
}

