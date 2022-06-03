const { readFileSync } = require("fs");
const { send } = require("process");
var content = readFileSync("./auth/authDB.json", "utf-8");

exports.validateUser = (request, response) => {
  const email = request.query.email;
  const password = request.query.password;
  //console.log(email, password);
  const users = loadUsers();

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    response.status(200);
    response.send(user);
  } else {
    response.status(404);
    response.send({ error: "error" });
  }
};

loadUsers = () => {
  const users = JSON.parse(readFileSync("./auth/authDB.json"));

  return users;
};
