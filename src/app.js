import express from "express";
import entrypoint from "./controllers/entrypoint.js";
import cors from "cors";

const app = express()

app.use(cors());

app.use('/api', entrypoint);

app.listen(8000, () => {
    console.log('Server Started at Port, 8000')
})