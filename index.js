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
  console.log(usuarios)
  res.send('Cadastro realizado com sucesso!')
  res.status(200);
})

app.post("/tweets" , (req, res) => {
  tweets.push(req.body);
  res.send('Tweet salvo com sucesso!')
})

app.get( "/tweets",(req, res) => {
  const tweetsResponse = []
  const response = {data: tweetsResponse}
  tweets.reverse().slice(0,10).forEach((t) => {
    const avatar = usuarios.find(user => t.username === user.username)
    tweetsResponse.push({username: t.username, avatar: avatar.avatar, tweet: t.tweet})
  })
  res.send(response)
})


app.listen(5000, () => {
  console.log("Servidor rodando na porta: http://localhost:5000")
})