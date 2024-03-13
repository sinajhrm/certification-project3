const express = require('express')
const taskRouter = express.Router()

const Task = require('../models/task')
const Subtask = require('../models/subtask')

//#region region Tasks' Routes
taskRouter.get('/tasks', async (request, response) => {
    const { popSubtasks } = request.query
    // console.log(popSubtasks)
    let tasks = null
    // Why it populates it and ignores the if/else line???!
    if (popSubtasks)
        tasks = (await Task.find().populate('subtasks'))
    else
        tasks = (await Task.find())

    response.json(tasks)
})
//#endregion

// Get a specific task by ID
taskRouter.get('/tasks/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add or update a task
taskRouter.post('/tasks', async (req, res) => {
    const { updatedTask } = req.body;
    // console.log(updatedTask)
    try {
        let task = await Task.findById(updatedTask.id)
        // console.log(task)
        if (task) {
            Task.findByIdAndUpdate(task.id, task)
            return res.json({ message: 'Task updated successfully!', data: task })
        }
        else {
            task = await Task.create(updatedTask)
            return res.json({ message: 'Task created successfully!', data: task });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a task
taskRouter.delete('/tasks/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    try {
        let result = await Task.findByIdAndDelete(taskId);
        if (!result)
            return res.json({ message: 'Error happend while deleting task' })
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add or update a subtask for a specific task
taskRouter.post('/tasks/:taskId/subtasks', async (req, res) => {
    const taskId = req.params.taskId;
    const subtaskData = req.body;
    console.log(taskId)
    console.log(subtaskData)
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        let subtaskInsideTask = task.subtasks.find(subtaskIds => subtaskIds === subtaskData.id)
        if (subtaskInsideTask) {
            await Subtask.findByIdAndUpdate(subtaskData.id, subtaskData)
        }
        else {
            subtaskData._id = subtaskData.id
            await Subtask.create(subtaskData)
            task.subtasks.push(subtaskData.id)
        }

        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a subtask for a specific task
taskRouter.delete('/tasks/:taskId/subtasks/:subtaskId', async (req, res) => {
    const taskId = req.params.taskId;
    const subtaskId = req.params.subtaskId;
    try {
        const task = await Task.findById(taskId)
        const subtask = await Subtask.findById(subtaskId)
        const subtaskIdInsideTask = task.subtasks.find(tasksSubtaskId => tasksSubtaskId.toString() === subtaskId)
        // console.log(task)
        // console.log(subtask)
        // console.log(subtaskIdInsideTask)
        if (!task) {
            // when returning 404 as status code, no response data will be delivered to user
            return res.status(404).json({ message: 'Task not found!' });
        }
        if (!subtask) {
            return res.status(404).json({ message: 'Subtask not found!' });
        }
        if (!subtaskIdInsideTask) {
            return res.status(404).json({ message: 'Subtask not found in the given task!' });
        }
        console.log('filtering subtask')
        task.subtasks = task.subtasks.filter(subtask => subtask.toString() !== subtaskId);
        console.log('saving task')
        await task.save();
        console.log('deleting subtask')
        await Subtask.findByIdAndDelete(subtaskId)
        res.json({ message: 'Subtask deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = taskRouter
