import { response } from "express";

export const setResponse = (data, response) => {
  response.status(200);
  response.json(data);
}

export const setError = (error, response) => {
  console.log(error);
  response.status(500);
  response.json({
    error: {
      code: "InternalSeerverError",
      message: "An internal server error occurred"
    }
  })
}