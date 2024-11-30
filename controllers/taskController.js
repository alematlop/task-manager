const { Task } = require('../models');
const asyncWrapper = require('../middleware/async.js');
const { createCustomError } = require('../errors/customError');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.findAll();
    res.status(200).json({tasks});
})

const createTask = asyncWrapper(async (req, res) => {
    const newTask = await Task.create({name: req.body.name});
    res.status(201).json(newTask);
})

const getTask = asyncWrapper( async (req, res) => {
    console.log(req.params.id);
    const task = await Task.findByPk(req.params.id);
    console.log(task);
    if (task != null) {
        res.status(200).json({task});
    } else {
        return next(createCustomError(`No task with id : ${req.params.id}`), 404);
    }
})

const updateTask = asyncWrapper( async (req, res) => {
    const affected = await Task.update(
        {completed: req.body.completed,
        name: req.body.name,},
        {
            where: {
                id: req.params.id,
            },
        },
    );

    if (affected>0){
        res.status(200).send('Successfully updated');
    } else {
        return next(createCustomError(`No task with id : ${req.params.id}`), 404);
    }
})

const deleteTask = asyncWrapper( async (req, res) => {
    const affected = await Task.destroy({
        where: {id: req.params.id,
        }
    });

    if (affected>0){
        res.status(200).send('Successfully deleted');
    } else {
        return next(createCustomError(`No task with id : ${req.params.id}`), 404);
    }
})



module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask,
}