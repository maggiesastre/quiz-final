const { readFileSync } = require("fs");
var content = readFileSync("./quiz/quiz.json", "utf-8");

const loadData = () => {
  const quiz = JSON.parse(readFileSync("./quiz/quiz.json"));
  //console.log(quiz);
  return quiz;
};

exports.listQuiz = (request, response) => {
  const allQuiz = loadData();
  const quizTypes = allQuiz.map((quiz) => ({
    type: quiz.type,
    name: quiz.name,
  }));
  if (quizTypes != null) {
    response.status(200);
    response.send(quizTypes);
  } else {
    response.status(404);
    response.send({ error: "error" });
  }
};

exports.getQuiz = (request, response) => {
  const type = request.query.type;
  const allQuiz = loadData();
  //console.log(type);
  const quizType = allQuiz.filter((quiz) => quiz.type === type);

  if (quizType != null) {
    response.status(200);
    response.send(quizType);
  } else {
    response.status(404);
    response.send({ error: "error" });
  }
};

exports.validateAnswer = (request, response) => {
  //console.log(request.body);
  const { answers, type } = request.body;
  const quiz = loadData();
  const quizType = quiz.find((quiz) => quiz.type === type);
  if (!quizType) {
    response.status(404);
    response.send({ error: "error" });
  }
  let rating = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  quizType.questions.forEach((question, i) => {
    if (question.answer === answers[i]) {
      rating++;
      correctAnswers++;
    } else {
      wrongAnswers++;
    }
  });

  //console.log(correctAnswers, wrongAnswers);
  response.status(200);
  response.send({
    rating: rating,
    correctAnswers: correctAnswers,
    wrongAnswers: wrongAnswers,
  });
};


