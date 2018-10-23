const constants = {
    errorMessages: {
        ORDER_TAKEN_OR_NOT_FOUND:"ORDER_ALREADY_TAKEN_OR_DOES_NOT_EXIST",
        ORDER_ALREADY_EXISTS:"ORDER_ALREADY_EXISTS",
        LOGIN_ERROR:"Your login details could not be verified. Please try again.",
        ERROR_5XX:"An unknown server error occurred."
    },
    EMAIL_REGEX:[/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"]
};

module.exports = constants;
