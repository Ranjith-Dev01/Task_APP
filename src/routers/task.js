const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const Task = require('../models/taskmodel');

// TASK

router.post('/task', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Fetching all Tasks

router.get('/tasks', auth, async (req, res) => {
  // const match = {};

  // if (req.query.completed) {
  //   match.completedField = req.query.completed === 'true';
  // }
  try {
    const tasks = await Task.find({ owner: req.user._id });
    // await req.user
    //   .populate({
    //     path: 'tasks',
    //     match,
    //     options: {
    //       limit: parseInt(req.query.limit),
    //       skip: parseInt(req.query.skip),
    //     },
    //   })
    //   .execPopulate();
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Fetching Task by id

router.get('/task/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
