const { Router } = require("express"); //dependencia para rotas
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UserController = require("../controllers/UserController"); //pega os métodos e passa para as rotas
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER); // é feito pegando do uploand config caso eu queira fazer com outar biblioteca

const userController = new UserController();//separando um espaço na memoria 
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", userController.create);
usersRoutes.put("/", ensureAuthenticated, userController.update); //put atualiza informações do banco de dados
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);//patch serve para atualizar um campo específico

module.exports = usersRoutes;