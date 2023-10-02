class AppError {
    message;
    statuscode;     //criar fora faz toda a minha class ter conhecimento dela

    constructor(message, statuscode = 400){ //toda vez que for utilizada precisa do massage e do statuscode
        this.message = message;
        this.statuscode = statuscode //joga para o global
    }
}

module.exports = AppError;