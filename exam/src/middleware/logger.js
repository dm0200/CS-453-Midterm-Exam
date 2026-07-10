/* logger.js is a request logger that records:
    HTTP method,
    path,
    response status,
    time taken.
*/
// src/middleware/logger.js

export function logger(req, res, next) {
    const start = Date.now();

    res.on("finish", () => {
        const elapsedMs = Date.now() - start;
        console.log(
            `${req.method} ${req.originalUrl} ${res.statusCode} ${elapsedMs}ms`
        );
    });

    next();
}