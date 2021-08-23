import { Router } from "express";
import repayments from "./repayment";


const router = Router();

router.use("/repayments", repayments);

export default router;
