class TistoryError extends Error {
    constructor(status, message) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TistoryError);
        }

        this.status = status;
        this.message = message;
    }
}

module.exports = {
    TistoryError,
};