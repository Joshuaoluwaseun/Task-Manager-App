const Tasks = require('../models/task')
const asyncWrapper = require('../middlewares/async')
const {createCustomError, CustomAPIError} = require('../errors/custormErrors');

const getAllTask =  asyncWrapper(async (req, res) => {
    const tasks = await Tasks.find()

    return res.status(200).json({ tasks })
    
})

const createTask = asyncWrapper(async (req, res) => {
    const createdTask = await Tasks.create(req.body);  

    return res.status(201).json({ createdTask })
})

const getOneTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Tasks.findOne({ _id: taskID });

    if(!task) return next(createCustomError(`The task with the given id: ${taskID} does not exist`, 404))
    
    return res.status(200).json({task});
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id:taskID } = req.params;
    const task = await Tasks.findOneAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true
    })
    if(!task) return next(createCustomError(`The task with the given id: ${taskID} does not exist`, 404))

    return res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
    const {id:taskID} = req.params;
    const task = await Tasks.findOneAndDelete({_id: taskID});

    if (!task) return next(createCustomError(`The task with the given id: ${taskID} does not exist`, 404));

    return res.status(200).json({task});
})

module.exports = {
    getAllTask,
    createTask,
    getOneTask,
    updateTask,
    deleteTask
}