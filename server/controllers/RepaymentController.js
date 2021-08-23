import dotenv from 'dotenv';
import Response from '../helpers/Response';
import { RepaymentService } from '../services/RepaymentService';

dotenv.config();

/**
 * @exports
 * @class RepaymentController
 */
class RepaymentController {
  /**
   * @static
   * @param {object} req  request object
   * @param {object} res response object
   * @memberof RepaymentController
   * @returns {object} data
   */
  static async rePaymentUploads(req, res) {
    try {
      let result;
      const { CustomerID, SeasonID } = req.body;
      const customerSummary = await RepaymentService.getCustomerSummaryByCustomerID(CustomerID);

      if (SeasonID) {
        result = await RepaymentService.operateOverRidePayment(req, customerSummary);
      } else {
        const operateOverPaid = await RepaymentService.operateOverPaidPayment(req, customerSummary);
        if (!operateOverPaid.isOverPaid) {
          result = await RepaymentService.operateCascadePayment(req, customerSummary);
        } else {
          result = operateOverPaid.result;
        }
      }

      result.forEach(item => RepaymentService.saveRepayments(req, item));
      return Response.successMessage(req, res, 'Customer Summaries have been updated successfully!', result, 200);

    } catch (error) {
      return Response.errorMessage(req, res, error.message, 500);
    }

  }

  /**
  * Get all repayments
  * @static
  * @param {object} req  request object
  * @param {object} res response object
  * @memberof RepaymentController
  * @returns {object} data
  */
  static async getRepayments(req, res) {
    try {
      const getRepayments = await RepaymentService.getAllRepayments();
      if (!getRepayments) {
        return Response.errorMessage(req, res, 'Not Repayments found!', 404);
      }
      return Response.successMessage(req, res, 'Repayments retrieved successfully!', getRepayments, 200);
    } catch (error) {
      return Response.errorMessage(req, res, error.message, 500);
    }

  }

  /**
  * Get all Customer Summaries
  * @static
  * @param {object} req  request object
  * @param {object} res response object
  * @memberof RepaymentController
  * @returns {object} data
  */
  static async getAllCustomerSummaries(req, res) {
    try {
      const getCustomerSummaries = await RepaymentService.getAllCustomerSummaries();
      if (!getCustomerSummaries) {
        return Response.errorMessage(req, res, 'No Customer Summary found!', 404);
      }
      return Response.successMessage(req, res, 'Customer Summaries have been retrieved successfully!', getCustomerSummaries, 200);
    } catch (error) {
      return Response.errorMessage(req, res, error.message, 500);
    }
  }
}

export default RepaymentController;
