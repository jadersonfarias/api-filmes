class AppError {
    message;
    statuscode;     //criar fora faz toda a minha class ter conhecimento dela

    constructor(message, statuscode = 400){
        this.message = message;
        this.statuscode = statuscode
    }
}

module.exports = AppError;