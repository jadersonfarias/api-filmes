const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated( request, response, next){
    const authHeader = request.headers.authorization; //token que foi criado e enviado pelo sessions está aki
  
    if(!authHeader){
        throw new AppError("Jwt token não informado", 401);
    }

    const [, token] = authHeader.split(" ") //precisa dar um espaço aki

    try{
        const { sub: user_id } = verify(token, authConfig.jwt.secret) //se esse token for válido vai para sub e dai posso dar qualquer nome de preferencia semantico
       
        request.user = { //essa propriedade existe a partir de agora na request
            id: Number(user_id) //passa para number pois tinha transformado  o id em string lá no sessions 
        }

        return next();
    }catch{
        throw new AppError("Jwt token inválido", 401);
    }
}

module.exports = ensureAuthenticated;