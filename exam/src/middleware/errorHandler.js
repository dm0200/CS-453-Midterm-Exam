//src/middleware/errorHandler.js
export function errorHandler(err, req, res, next) {
    console.error(`${req.requestId || 'SERVER'} ERROR`, err);

    // If the error comes from Express parsing malformed JSON
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Malformed JSON payload."
        });
    }

    res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong on the server."
        //requestId: req.requestId
    });
}
