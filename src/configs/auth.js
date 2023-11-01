module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || "default",//gera a chave
        expiresIn: "1d" //tempo de duração
    }
}