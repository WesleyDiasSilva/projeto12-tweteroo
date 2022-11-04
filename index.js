import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
const usuarios = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  usuarios.push(req.body);
  res.status(201).send("Cadastro realizado com sucesso!");
});

app.post("/tweets", (req, res) => {
  tweets.push(req.body);
  res.status(201).send("Tweet salvo com sucesso!");
});

app.get("/tweets", (req, res) => {
  const tweetsResponse = [{
		username: "bobesponja",
			avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
		  tweet: "eu amo o hub"
	}];
  const response =  tweetsResponse;
  tweets
    .reverse()
    .slice(0, 10)
    .forEach((t) => {
      const avatar = usuarios.find((user) => t.username === user.username);
      tweetsResponse.push({
        username: t.username,
        avatar: avatar.avatar,
        tweet: t.tweet,
      });
    });
    console.log(response)
  res.send(response);
});

app.listen(5000, () => {
  console.log("Servidor rodando na porta: http://localhost:5000");
});
