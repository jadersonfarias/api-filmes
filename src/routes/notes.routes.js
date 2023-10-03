const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const NotesController = require("../controllers/NotesController")

const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated) //bota o middleware para todas as rotas

notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);


module.exports = notesRoutes;