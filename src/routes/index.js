//pasta que junta todas as rotas
const { Router } = require("express")

const usersRouter = require("./users.routes")
const notesRouter = require("./notes.routes") //rotas
const tagsRouter = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router()

routes.use("/users", usersRouter) 
routes.use("/notes", notesRouter)   //usuario vai ser joga para qual rota ele escolher
routes.use("/tags", tagsRouter)
routes.use("/sessions", sessionsRouter)

module.exports = routes;