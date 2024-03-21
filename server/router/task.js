const express = require('express')
const taskRouter = express.Router()

const Task = require('../models/task')
const Subtask = require('../models/subtask')
const User = require('../models/user')

taskRouter.get('/', async (request, response) => {
    const { popSubtasks, userId } = request.query
    console.log(request.query)
    let tasks = null

    if (popSubtasks)
        tasks = (await User.findById(userId).populate({ path: 'tasks', populate: { path: 'subtasks' } })).tasks
    else
        tasks = (await Task.find())

    response.json(tasks)
})

// Get a specific task by ID
taskRouter.get('/:taskId', async (req, res) => {
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
taskRouter.post('/', async (req, res) => {
    const { updatedTask, userId } = req.body;
    try {
        let task;
        const existingTask = await Task.findById(updatedTask.id);
        if (existingTask) {
            task = await Task.findByIdAndUpdate(updatedTask.id, updatedTask, { new: false });
        } else {
            task = await Task.create(updatedTask);
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.tasks.push(task._id);

            await user.save();
        }


        return res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a task
taskRouter.delete('/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    try {
        let result = await Task.findByIdAndDelete(taskId);
        if (!result)
            return res.json({ message: 'Error happend while deleting task' })

        const user = await User.findOne({ tasks: taskId });

        if (!user) {
            return res.json({ message: 'User not found' });
        }

        // Remove the task's ID from the user's tasks array
        user.tasks = user.tasks.filter(task => task.toString() !== taskId);

        // Save the updated user document
        await user.save();

        //https://www.mongodb.com/docs/manual/reference/operator/query/in/
        await Subtask.deleteMany({ _id: { $in: result.subtasks } });

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add or update a subtask for a specific task
taskRouter.post('/subtasks/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    const subtaskData = req.body;
    console.log(taskId)
    console.log(subtaskData)
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        let subtaskInsideTask = task.subtasks.find(subtaskIds => subtaskIds.toString() === subtaskData.id)
        if (subtaskInsideTask) {
            await Subtask.findByIdAndUpdate(subtaskData.id, subtaskData, { new: false })
        }
        else {
            subtaskData._id = subtaskData.id
            await Subtask.create(subtaskData)
            task.subtasks.push(subtaskData.id)
        }

        await task.save();
        res.json(task);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
});

// Delete a subtask for a specific task
taskRouter.delete('/subtasks/:taskId/:subtaskId', async (req, res) => {
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
