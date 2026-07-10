// validateTask.js is a validation middleware for creating or updating tasks.
// src/middleware/validateTask.js

export function validateTask(req, res, next) {
    const {title, course} = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            error: "title cannot be empty",
        });
    }

    if (!course || typeof course !== "string" || course.trim() === "") {
        return res.status(400).json({
            error: "course cannot be empty",
        });
    }

    next();
}