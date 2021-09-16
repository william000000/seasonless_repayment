import { combineReducers } from 'redux';
import { getCustomerSummariesReducers, getRepaymentDetailsReducers, repaymentUploadReducers } from './repaymentUploadReducers';

export default combineReducers({
  repaymentUpload: repaymentUploadReducers,
  getCustomerSummaries: getCustomerSummariesReducers,
  customerRepaymentDetails: getRepaymentDetailsReducers
});
