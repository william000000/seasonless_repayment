import {
    REPAYMENT_UPLOAD_REQUEST,
    REPAYMENT_UPLOAD_SUCCESS,
    REPAYMENT_UPLOAD_ERROR,
    CUSTOMER_SUMMARIES_REQUEST,
    CUSTOMER_SUMMARIES_SUCCESS,
    CUSTOMER_SUMMARIES_ERROR,
  } from '../actionTypes/repaymentUploadActionTypes';
  
  const repaymentUploadReducers = (state = {}, action) => {
    switch (action.type) {
      case REPAYMENT_UPLOAD_REQUEST:
        return { loading: true };
      case REPAYMENT_UPLOAD_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
      case REPAYMENT_UPLOAD_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      default:
        return state;
    }
  };  

  const getCustomerSummariesReducers = (state = {}, action) => {
    switch (action.type) {
      case CUSTOMER_SUMMARIES_REQUEST:
        return { loading: true };
      case CUSTOMER_SUMMARIES_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
      case CUSTOMER_SUMMARIES_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      default:
        return state;
    }
  };  
  
  export {  repaymentUploadReducers, getCustomerSummariesReducers } ;
  