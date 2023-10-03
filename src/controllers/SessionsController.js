const { compare } = require("bcryptjs"); // banco de dados e para validar o dados do email e senha do usuario
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const authConfig = require("../configs/auth");   //depedencias do token 
const { sign } = require("jsonwebtoken")

class SessionsController {
    async create(request, response){
        const {email , password} = request.body

        const user = await knex("users").where({email}).first(); // pega os dados pelo email passado

        if(!user) { //caso for falso vem para cá
            throw new AppError("E-mail e/ou senha incorreta", 401) 
        }

        const passwordMatched = await compare(password, user.password); //compara a senha criptografada

        if (!passwordMatched){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id), //pega o id do user e transforma em texto
            expiresIn
        })
      
        return response.json({ user, token })
    }
}

module.exports = SessionsController;