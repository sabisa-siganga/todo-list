const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");

const app = express();

const PORT = 8080 || process.env.PORT;

app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`Application up and running on port: ${PORT}`);
});

module.exports = app;
