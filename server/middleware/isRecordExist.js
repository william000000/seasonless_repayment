import Response from "../helpers/Response";
import { RepaymentService } from "../services/RepaymentService";

export const isSeasonExist = async (req, res, next) => {
    try {
        const { SeasonID } = req.body;
        if (SeasonID) {
            const result = await RepaymentService.getSeasonBySeasonID(Number(SeasonID));
            if (!result || result.length == 0) {
                return Response.errorMessage(req, res, 'Season Not Found!', 404);
            }
            next();
        } else {
            next();
        }

    } catch (error) {
        return Response.errorMessage(req, res, error.message, 500);
    }
}

export const isCustomerSummaryExist = async (req, res, next) => {
    try {
        const { CustomerID } = req.body;
        const customerSummary = await RepaymentService.getCustomerSummaryByCustomerID(CustomerID);

        if (!customerSummary || customerSummary.length == 0) {
            return Response.errorMessage(req, res, "Record Not Found, Try other Valid CustomerID!", 404);
        }
        next();
    } catch (error) {
        return Response.errorMessage(req, res, error.message, 500);
    }
}

