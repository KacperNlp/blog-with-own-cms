const createError = require("http-errors");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require("./config");

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));

const indexRouter = require("./routes/index");
const accountRouter = require("./routes/account");
const adminRouter = require("./routes/admin");
const articleRouter = require("./routes/article");
const listOfUsers = require("./routes/usersList");
const usersRouter = require("./routes/users");
const registerRouter = require("./routes/register");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cookieSession({
    name: config.sessionName,
    keys: config.sessionKey,
    maxAge: config.sessionTime,
  })
);

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use("/", indexRouter);
app.use("/account", accountRouter);
app.use("/admin", adminRouter);
app.use("/article", articleRouter);
app.use("/users-list", listOfUsers);
app.use("/users", usersRouter);
app.use("/register", registerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
