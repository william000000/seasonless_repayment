import { combineReducers } from 'redux';
import { getCustomerSummariesReducers, repaymentUploadReducers } from './repaymentUploadReducers';

export default combineReducers({
  repaymentUpload: repaymentUploadReducers,
  getCustomerSummaries: getCustomerSummariesReducers,
});
