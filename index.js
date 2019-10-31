const express = require("express");
const helmet = require("helmet");

const postsRouter = require("./posts/postrouter");
const usersRouter = require("./users/userrouter");

const server = express();

function logger(req, res, next) {
  console.log(
    require("url").parse(req.url),
    " made a ",
    req.method,
    " request at: ",
    new Date()
  );
  next();
}

server.use(helmet());
server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

server.listen(8000, () => console.log("API running on port 8000"));
