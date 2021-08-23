import axios from 'axios';
import {
    REPAYMENT_UPLOAD_ERROR,
    REPAYMENT_UPLOAD_REQUEST,
    REPAYMENT_UPLOAD_SUCCESS,
    CUSTOMER_SUMMARIES_ERROR,
    CUSTOMER_SUMMARIES_REQUEST,
    CUSTOMER_SUMMARIES_SUCCESS,
} from "../actionTypes/repaymentUploadActionTypes";
import { notificationError, notificationSuccess } from "../../helpers/toastNotificationPopUp";
import { spinnerStatusAction } from "./spinnerAction";
import { errorMessageHandler } from "../errorMessageHandler";

const BaseUrl = `http://localhost:4000`;


const repaymentUploadAction = (repaymentData) => async (dispatch) => {
    try {
        spinnerStatusAction(true);
        dispatch({ type: REPAYMENT_UPLOAD_REQUEST });
        const { data } = await axios.post(`${BaseUrl}/api/repayments`, repaymentData);
        dispatch({ type: REPAYMENT_UPLOAD_SUCCESS, payload: data });
        spinnerStatusAction(false);
        notificationSuccess(data.message);

    } catch (error) {
        dispatch({ type: REPAYMENT_UPLOAD_ERROR, payload: errorMessageHandler(error) })
        spinnerStatusAction(true);
        notificationError(errorMessageHandler(error));
        spinnerStatusAction(false);
    }
}

const getCustomerSummariesAction = () => async (dispatch) => {
    try {
        spinnerStatusAction(true);
        dispatch({ type: CUSTOMER_SUMMARIES_REQUEST });
        const { data } = await axios.get(`${BaseUrl}/api/repayments/summaries`);
        dispatch({ type: CUSTOMER_SUMMARIES_SUCCESS, payload: data });
        spinnerStatusAction(false);

    } catch (error) {
        dispatch({ type: CUSTOMER_SUMMARIES_ERROR, payload: errorMessageHandler(error) })
        spinnerStatusAction(true);
        notificationError(errorMessageHandler(error));
        spinnerStatusAction(false);
    }
}

export { repaymentUploadAction, getCustomerSummariesAction };