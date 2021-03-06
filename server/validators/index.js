import { validationResult } from "express-validator";
import Response from '../helpers/Response';

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors.map(err => err.msg);
    return Response.errorMessage(req, res, errorMessage, 400);
  }
  return next();
};
