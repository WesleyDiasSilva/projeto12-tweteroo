import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(express.json());
app.use(cors());

const usuarios = [
  {
    username: "Wesley",
    avatar:
      "https://t.ctcdn.com.br/MJFyxnOWYbXOWChcEWbT03PXkq4=/512x288/smart/filters:format(webp)/i329345.jpeg",
  },
];

const tweets = [
  {
    username: "Wesley",
    avatar:
      "https://t.ctcdn.com.br/MJFyxnOWYbXOWChcEWbT03PXkq4=/512x288/smart/filters:format(webp)/i329345.jpeg",
    tweet: "Foco, força & fé!",
  }
];

app.post("/sign-up", (req, res) => {
  let { username, avatar } = req.body;
  username = username.replace(" ", "");

  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  usuarios.push({ username, avatar });
  res.status(201).send("Usuário cadastrado com sucesso");
});

app.get("/tweets?", (req, res) => {
  if (usuarios.length === 0) {
    res.status(400).send("Não foi possível no momento, tente mais tarde!");
    return;
  }

  const { page } = req.query;
  const response = tweets.slice(10 * (page -1), 10 * page);
  res.status(200).send(response);
});

app.post("/tweets", (req, res) => {
  let username = req.headers.user;
  const { tweet } = req.body;
  username = username.replace(" ", "");

  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const user = usuarios.find((user) => user.username === username);
  tweets.push({
    username,
    tweet,
    avatar: user.avatar,
  });

  res.status(201).send("ok");
});

app.get("/tweets/:username", (req, res) => {
  let { username } = req.params;
  username = username.replace("%20", "");
  username = username.replace(" ", "");

  const response = tweets.filter((t) => t.username === username);

  res.send(response);
});

const port = 5000;

app.listen(port, () => {
  console.log(
    `${chalk.magenta("Server rodando em:")} ${chalk.magenta.italic(
      `http://localhost:${port}`
    )}`
  );
});
