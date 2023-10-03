const fs = require("fs")
const path = require("path")  // determina um caminho absoluto indepedento do destino
const uploadsConfig = require("../configs/upload")

class DiskStorage {
    async saveFile(file){
        await fs.promises.rename( //rename serve para mudar de lugar o arquivo ou mudar o nome neste caso mudar de lugar
            path.resolve(uploadsConfig.TMP_FOLDER, file), //pega da pasta temporaria e envia para UPLOADS_FOLDER
            path.resolve(uploadsConfig.UPLOADS_FOLDER, file)
        )

        return file;
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadsConfig.UPLOADS_FOLDER, file)
        try{
            await fs.promises.stat(filePath);//pega o arquivo salvo para poder deletar stat = status
        }catch{
            return;
        }

        await fs.promises.unlink(filePath) // deleta o arquivo antigo com um metodo do fs
    }
}

module.exports = DiskStorage;