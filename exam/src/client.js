/*
Write a small client program that calls your API.

This can be a Node script using fetch.

The client should demonstrate:

1. calling /health,
2. creating a task,
3. listing all tasks,
4. getting one task by id,
5. updating a task,
6. deleting a task.

The client does not need a GUI. Console output is fine.
*/
// client.js

const API_BASE_URL = "http://localhost:3000";

async function main() {

    // 1. calling /health
    console.log("\n********** calling /health **********");
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const health = await healthResponse.json();
    console.log("GET /health:", health);

    // 2. creating a task
    console.log("\n********** creating a task **********");
    const createResponse = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: "Watch Week 1 lecture",
            course: "CS453",
            completed: false
        })
    });

    const newTask = await createResponse.json();
    console.log(`POST /api/tasks (${createResponse.status}):`, newTask);

    // 3. listing all tasks
    console.log("\n********** listing all tasks **********");
    const listResponse = await fetch(`${API_BASE_URL}/api/tasks`);
    const tasks = await listResponse.json();
    console.log(`GET /api/tasks (${listResponse.status}):`, tasks);

    // 4. getting one task by id
    console.log("\n********** getting one task by id **********");
    const id = newTask.id;
    const getResponse = await fetch(`${API_BASE_URL}/api/tasks/${id}`);
    const task = await getResponse.json();
    console.log(`GET /api/tasks/${id} (${getResponse.status}):`, task);

    // 5. updating a task
    console.log("\n********** updating a task **********");
    const updateResponse = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({completed: true})
    });
    const updatedTask = await updateResponse.json();
    console.log(`PATCH /api/tasks/${id} (${updateResponse.status}):`, updatedTask);

    // 6. deleting a task
    console.log("\n********** deleting a task **********");
    const deleteResponse = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: "DELETE"
    });
    console.log(`DELETE /api/tasks/${id} (${deleteResponse.status}): No Content`);

    // Double Checking Deleting A Task Was Successful
    const verifyResponse = await fetch(`${API_BASE_URL}/api/tasks/${id}`);
    const verify = await verifyResponse.json();
    console.log(`GET /api/tasks/${id} after delete (${verifyResponse.status}):`, verify);
}

main().catch(console.error);