const express = require('express');
const router = express.Router();
const {
    getAllTask,
    createTask,
    updateTask,
    getOneTask,
    deleteTask 
        } = require('../controllers/tasks')


router.route('/')
    .get(getAllTask)
    .post(createTask);
router.route('/:id')
    .patch(updateTask)
    .get(getOneTask)
    .delete(deleteTask);



module.exports = router