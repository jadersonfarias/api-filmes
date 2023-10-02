const { Router } = require("express"); //dependencia para rotas

const UserController = require("../controllers/UserController") //pega os métodos e passa para as rotas

const usersRoutes = Router();

const userController = new UserController();//separando um espaço na memoria 

usersRoutes.post("/", userController.create);
usersRoutes.put("/:id", userController.update)

module.exports = usersRoutes;