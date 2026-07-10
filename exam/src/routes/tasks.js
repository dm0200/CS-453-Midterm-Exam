// This file handles data stored array, IDs, field validation, and individual routes behaviors.
//src/routes/tasks.js

import { Router } from "express";

export const router = Router();

// In-memory database array
let nextId = 3;
let tasks = [
    { id: 1, title: "Watch Week 1 lecture", course: "CS453", completed: false },
    { id: 2, title: "Complete Lab 1", course: "CS453", completed: true }
];

// GET /api/tasks => return all tasks
router.get("/", (req, res) => {
    res.json(tasks);
});

// GET /api/tasks/:id => return one task
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if(!task) {
        return res.status(404).json({
            error: "Not found"
        });
    }

    res.json(task);
});

// POST /api/tasks => creates a new task
router.post("/", (req, res) => {
    const {title, course, completed} = req.body;

    // Checks for required fields
    if (!title || !course) {
        return res.status(400).json({
            error: "Missing required fields: title and course are required"
        });
    }

    // Creates a new item.
    const newTask = {
        id: nextId++,
        title,
        course,
        completed: completed ?? false // Defaults to false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});


// PUT /api/tasks/:id => replace a task
router.put("/:id", (req,res) => {
    const id = Number(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id == id);

    if (taskIndex === -1) { // If the item/task does not exist, return a 404 response.
        return res.status(404).json({
            error: "Item not found"
        });
    }

    const {title, course, completed} = req.body;

    // Checks for required fields
    if (!title || !course || completed === undefined) {
        return res.status(400).json({
            error: "Missing required fields: title and course are required"
        });
    }

    tasks[taskIndex] = {
        id,
        title,
        course,
        completed: completed ?? false }; // Automatically Default to false
    res.json(tasks[taskIndex]);
});

// PATCH /api/tasks/:id => Partially update
router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) { // If the item/task does not exist, return a 404 response.
        return res.status(404).json({
            error: "Item not found"
        });
    }

    const {title, course, completed} = req.body;

    // Updates only portions that need to be updated

    if (title !== undefined) {
        task.title = title;
    }

    if (course !== undefined) {
        task.course = course;
    }

    if (completed !== undefined) {
        task.completed = completed;
    }

    res.json(task);
});

// DELETE /api/tasks/:id => delete a task
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    /*
    if (!task) { // If the item/task does not exist, return a 404 response.
        return res.status(404).json({
            error: "Item not found"
        });
    }*/

    if (index === -1) { // If the item does not exist, return a 404 response.
        return res.status(404).json({
            error: "Item not found"
        });
    }

    // Deleting item
    // If the item exists, delete it and return status code 204.
    tasks.splice(index, 1);

    res.status(204).send(); // A 204 response does not need to include a response body.
});