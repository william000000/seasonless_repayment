import { check } from "express-validator";

export const validateRepaymentInputs = () => {
    return [
      check('CustomerID', 'CustomerID is required and must be an integer').isInt(),
      check('Amount', 'Amount is required and must be a number').isFloat(),
    ];
  }
