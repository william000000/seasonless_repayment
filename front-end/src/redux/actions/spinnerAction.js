import { SPINNER_STATUS } from "../actionTypes/spinnerActionType";

export const spinnerStatusAction = (status) => ({
    type: SPINNER_STATUS,
    payload: status,
});
