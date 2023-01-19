const express = require("express");
const { json } = require("body-parser");
const { v4: uuid } = require("uuid");
let users = [];
const fs = require("fs");
const path = require("path");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const cors = require("cors");

//key fot JWT

const jwtSecret = "secret123";

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

app.listen(3002, () => {
  console.log("listening on port 30001");
});

// save users list
function saveUserToFile(user) {
  users.push(user);
  fs.writeFileSync(
    path.join(__dirname, "./data/users.json"),
    JSON.stringify(users)
  );
}

//read Users list from file in json from postman
function readUsersFromFile() {
  console.log(path.join(__dirname, "./data/users.json"));
  const buffer = fs.readFileSync(path.join(__dirname, "./data/users.json"));
  const stringData = buffer.toString();
  if (stringData) {
    users = JSON.parse(stringData);
  }
}
readUsersFromFile();

////

app.get("/api/users", (request, response) => {
  console.log("/api/users");
  response.json({ users });
});

app.post("/api/users/register", (request, response) => {
  console.log("user register");
  const user = request.body;
  user.id = uuid();
  user.id = uuid();
  user.password = passwordHash.generate(user.password);
  saveUserToFile(user);

  return response.json({
    user,
  });
});

app.post("/api/users/login", (request, response) => {
  console.log("User Login in progress..");
  const { email, password } = request.body;

  // console.log({ email, password });

  const user = users.find((user) => {
    return user.email === email;
  });

  if (user && passwordHash.verify(password, user.password)) {
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, jwtSecret);

    return response.json({ message: "login success", token, type: "Bearer" });
  }

  return response.status(400).json({
    message: "Invalid Email or Password",
  });
});

function authMiddleware(request, response, next) {
  const { authorization } = request.headers;

  try {
    const token = authorization.split(" ")[1]; // ["Bearer" , 'token']
    jwt.verify(token, jwtSecret);
  } catch (error) {
    return response.status(403).json({ error: "Unauthorized Access" });
  }

  next();
}

app.get(" ", authMiddleware, (req, res) => {
  res.json({ items: ["order1", "order2", "order3"] });
});

// app.get("/api/profile", authMiddleware, (request, response) => {
//   response.json({ profile: { name: "virendra" } });
// });
