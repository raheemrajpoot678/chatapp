import { AppError } from "../utils/AppError.js";

const handleCastErrorDb = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};
const handelDuplicateErrorDb = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.+)\\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value.`;
  return new AppError(message, 400);
};
const handleValidationErrorDb = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

function sendErrorDev(err, res) {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
}

function sendErrorProd(err, res) {
  if (err.isOprational) {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    console.log("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong🥲☹️",
    });
  }
}

export const globalErrorController = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, name: err.name };

    if (error.name === "CastError") error = handleCastErrorDb(error);
    if (error.code === 11000) error = handelDuplicateErrorDb(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDb(error);

    sendErrorProd(error, res);
  }
};
