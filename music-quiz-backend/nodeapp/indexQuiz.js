const cors = require("cors");
const express = require("express");
const { listQuiz, getQuiz, validateAnswer } = require("./quiz/quiz");

const portQuiz = 3200;
const app = express();
app.use(express.json());
app.use(cors());

app.listen(portQuiz, () => console.log("server running"));

app.get("/list", listQuiz);
app.get("/quiz", getQuiz);
app.post("/ranking", validateAnswer);
