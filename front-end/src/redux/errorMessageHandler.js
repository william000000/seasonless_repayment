export const errorMessageHandler = (error) => error.response && error.response.data
    ? error.response.data.message || error.response.data.error
    : error.message;