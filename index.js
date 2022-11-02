import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
const app = express();

app.use(cors())
app.use(bodyParser.json())
const usuarios = []
const tweets = []

app.post("/sign-up", (req, res) => {
  usuarios.push(req.body)
  res.json(req.body);
  res.status(200);
})


app.listen(5000, () => {
  console.log("Servidor rodando!")
})