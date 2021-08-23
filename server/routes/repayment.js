import { Router } from "express";
import RepaymentController from "../controllers/RepaymentController";
import { validateRepaymentInputs } from "../validators/rules/repaymentInputRules";
import catchInputError from "../validators";
import { isCustomerSummaryExist, isSeasonExist } from "../middleware/isRecordExist";

const router = Router();

router.post('/', validateRepaymentInputs(), catchInputError, isCustomerSummaryExist, isSeasonExist, RepaymentController.rePaymentUploads);
router.get('/', RepaymentController.getRepayments);
router.get('/summaries', RepaymentController.getAllCustomerSummaries);

export default router;
