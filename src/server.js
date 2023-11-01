require("express-async-errors");
require("dotenv/config");

const migrationsRun = require("./database/sqlite/migrations")
const uploadConfig = require("./configs/upload")

const cors = require("cors")
const AppError = require("./utils/AppError")
const express = require("express");

const routes = require("./routes") //ligando a rotas com o server

migrationsRun();

const app = express();
app.use(cors());
app.use(express.json())//trasformas o dados em json

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes); //usando as rotas


app.use((error, request,response, next) => {
    if(error instanceof AppError){ //error do lado do cliente porque vai ser usa só para error do cliente
        return response.status(error.statuscode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error); //para debugar caso preciso

    return response.status(500).json({ //caso não sendo um error do cliente vem para cá
        status: "error",
        message: "internal server error"
    })
})

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`sever is running on port ${PORT}`));