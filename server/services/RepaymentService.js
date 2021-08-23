import { Repayments, CustomerSummaries, Seasons, Customers } from "../database/models"
import MyQueries from "./MyQueries";

export class RepaymentService {


  /**
  * Update customer's summary details
  * @static
  * @description
  * @returns {Object} response
  */
  static async updateCustomerSummary(CustomerSummaryID, TotalCredit, TotalRepaid) {
    const toUpdateObj = [
      { TotalCredit, TotalRepaid },
      { where: { id: CustomerSummaryID } },
    ];
    return MyQueries.update(CustomerSummaries, toUpdateObj);
  }

  /**
   * Get a spefic customer's summaries
   * @static
   * @description 
   * @returns {Object} response
   */

  static async getCustomerSummaryByCustomerID(CustomerID) {
    const searchObj = {
      where: { CustomerID },
      attributes: [
        'id', 'CustomerID', 'SeasonID', 'TotalRepaid', 'TotalCredit'
      ],
      order: [
        ['SeasonID', 'ASC'],
      ],
    };
    const customerObj = {
      where: { CustomerID },
      attributes: [
        'CustomerID', 'CustomerName'
      ],
    }
    const summaryDetails = await MyQueries.findAll(CustomerSummaries, searchObj);

    const customerDetails = await MyQueries.findOne(Customers, customerObj);

    summaryDetails.forEach(item => {
      if(customerDetails.dataValues.CustomerID === item.dataValues.CustomerID) {
        item.dataValues.CustomerName = customerDetails.dataValues.CustomerName;  
      }
    })

    return Object.values(summaryDetails);
  }

  /**
   * Cascade
   * @static
   * @description 
   * @returns {Object} response
   */

  static async operateCascadePayment(req, data) {
    const { Amount } = req.body;
    let summaryOutput = {};
    let AmountForPayment = Number(Amount);

    data.forEach(item => {
      item.dataValues.TotalCredit = Number(item.dataValues.TotalCredit);
      item.dataValues.TotalRepaid = Number(item.dataValues.TotalRepaid);
     
      if (Number(item.dataValues.TotalCredit) >= Number(item.dataValues.TotalRepaid)) {
        item.dataValues.debt = Number(item.dataValues.TotalCredit) - Number(item.dataValues.TotalRepaid);
       
        if (AmountForPayment > 0 && item.dataValues.debt < AmountForPayment && item.dataValues.TotalRepaid <= item.dataValues.TotalCredit) {
          
          if(item.dataValues.id === data.length && item.dataValues.debt > 0 && AmountForPayment > 0) {
            item.dataValues.TotalRepaid += AmountForPayment;
            AmountForPayment = 0;
            item.dataValues.overPaid = item.dataValues.TotalRepaid - item.dataValues.TotalCredit;
            this.updateCustomerSummary(item.dataValues.id, item.dataValues.TotalCredit, item.dataValues.TotalRepaid);
          
          } else if(AmountForPayment > item.dataValues.debt) {
            item.dataValues.TotalRepaid += item.dataValues.debt;
            AmountForPayment -= item.dataValues.debt;
            item.dataValues.debt = item.dataValues.TotalCredit - item.dataValues.TotalRepaid;
            this.updateCustomerSummary(item.dataValues.id, item.dataValues.TotalCredit, item.dataValues.TotalRepaid);
          }

        } else {
          item.dataValues.TotalRepaid += AmountForPayment;
          AmountForPayment = 0;
          item.dataValues.debt = Number(item.dataValues.TotalCredit) - Number(item.dataValues.TotalRepaid);
          this.updateCustomerSummary(item.dataValues.id, item.dataValues.TotalCredit, item.dataValues.TotalRepaid);
        }
      }
      summaryOutput[item.dataValues.id] = item.dataValues;
    });

    return Object.values(summaryOutput);
  }


  /**
  * OverRide
  * @static
  * @description 
  * @returns {Object} response
  */

  static async operateOverRidePayment(req, data) {
    const { Amount, SeasonID } = req.body;
    let updatedSummary = {};

    data.map(item => {
      item.dataValues.TotalCredit = Number(item.dataValues.TotalCredit);
      item.dataValues.TotalRepaid = Number(item.dataValues.TotalRepaid);

      if (Number(item.dataValues.SeasonID) == Number(SeasonID)) {
        item.dataValues.TotalRepaid += Number(Amount);
        this.updateCustomerSummary(item.dataValues.id, item.dataValues.TotalCredit, item.dataValues.TotalRepaid);
        item.dataValues.overPaid = item.dataValues.TotalCredit < item.dataValues.TotalRepaid ? item.dataValues.TotalRepaid - item.dataValues.TotalCredit : null;
        updatedSummary[item.dataValues.id] = item.dataValues;
      }
    })

    return Object.values(updatedSummary);

  }

  /**
  * OverPaid
  * @static
  * @description 
  * @returns {Object} response
  */

  static async operateOverPaidPayment(req, data) {
    const { Amount } = req.body;
    let counter = 0;
    let result = false;
    let updatedData = {};

    data.map(item => {
      item.dataValues.TotalCredit = Number(item.dataValues.TotalCredit);
      item.dataValues.TotalRepaid = Number(item.dataValues.TotalRepaid);

      if (Number(item.dataValues.TotalCredit) <= Number(item.dataValues.TotalRepaid)) {
        counter++;
        if (counter == data.length) {
          item.dataValues.TotalRepaid += Number(Amount);
          result = true;
          item.dataValues.overPaid = item.dataValues.TotalRepaid - item.dataValues.TotalCredit;
          updatedData[item.dataValues.id] = item.dataValues;
          this.updateCustomerSummary(item.dataValues.id, item.dataValues.TotalCredit, item.dataValues.TotalRepaid);
        }
      }
    });

    return { isOverPaid: result ? true : false, result: Object.values(updatedData) };

  }

  /**
  * Get all customer's summaries
  * @static
  * @description
  * @returns {Object} response
  */
  static async getAllCustomerSummaries() {
    const searchObj = {
      attributes: [
        'id', 'CustomerID', 'SeasonID', 'TotalRepaid', 'TotalCredit'
      ],
      order: [
        ['id', 'ASC'],
      ],
    };
    const customerObj = {
      attributes: [
        'CustomerID', 'CustomerName'
      ],
    }
    const allCustomerSummaries = await MyQueries.findAll(CustomerSummaries, searchObj);
    const customerDetails = await MyQueries.findAll(Customers, customerObj);

    allCustomerSummaries.map(item => {
      item.dataValues.TotalCredit = Number(item.dataValues.TotalCredit);
      item.dataValues.TotalRepaid = Number(item.dataValues.TotalRepaid);
      if (item.dataValues.TotalRepaid >= item.dataValues.TotalCredit) {
        item.dataValues.overPaid = item.dataValues.TotalRepaid - item.dataValues.TotalCredit;
      } else {
        item.dataValues.debt = item.dataValues.TotalCredit - item.dataValues.TotalRepaid;
      }
      customerDetails.forEach(i => {
        if(i.dataValues.CustomerID === item.dataValues.CustomerID) {
          item.dataValues.CustomerName = i.dataValues.CustomerName;  
        }
      })
    });

    return allCustomerSummaries;
  }



  /**
   * Get all repayments details
   * @static
   * @description 
   * @returns {Object} response
   */
  static getAllRepayments() {
    const searchObj = {
      attributes: [
        'RepaymentID', 'CustomerID', 'SeasonID', 'Date', 'Amount', 'ParentID'
      ]
    };
    return MyQueries.findAll(Repayments, searchObj);
  }

  /**
   * Save repayments details
   * @static
   * @description 
   * @returns {Object} response
   */
  static saveRepayments(req, data) {
    const { Amount } = req.body;
    const { CustomerID, SeasonID, id } = data;
    const dataObj = { CustomerID, SeasonID, Amount, Date: new Date(), ParentID: id };
    return MyQueries.create(Repayments, dataObj);
  }

  /**
   * Get a season
   * @static
   * @description 
   * @returns {Object} response
   */
  static async getSeasonBySeasonID(SeasonID) {
    const searchObj = {
      where: { SeasonID },
      attributes: [
        'SeasonID', 'SeasonName', 'StartDate', 'EndDate'
      ],
    };
    return MyQueries.findOne(Seasons, searchObj);
  }

}