import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';

import createConnection from "@shared/infra/typeorm";

import "@shared/container";

import { router } from "./routes";
import { AppError } from "@shared/errors/AppError";

import upload from "@config/upload";

createConnection();

const app = express();

app.use(express.json());

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));

app.use(router);

// errors
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message
    });
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal server error - ${err.message}`
  });
});

export { app }