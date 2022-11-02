import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
const app = express();

app.use(cors())
app.use(bodyParser.json())
const usuarios = []
const tweets = []




app.listen(5000, () => {
  console.log("Servidor rodando!")
})