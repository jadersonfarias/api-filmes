const { compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError")

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
      
        return response.json(user)
    }
}

module.exports = SessionsController;