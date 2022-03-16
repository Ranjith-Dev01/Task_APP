const express = require("express");
const router = new express.Router();
const Task = require("../db/models/taskmodel");

// TASK

router.post("/task", async (req, res) => {
    const task = new Task(req.body);
  
    try {
      await task.save();
      res.status(201).send(task);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  
  // Fetching all Tasks
  
  router.get("/task", async (req, res) => {
    try {
      const task = await Task.find({});
      res.send(task);
    } catch (e) {
      res.status(500).send();
    } 
  });
  
  // Fetching Task by id
  
  router.get("/task/:id", async (req, res) => {
    const _id = req.params.id;
  
    try {
      const task = await Task.findById(_id);
      if (!task) {
        res.status(404).send();
      }
      res.send(task);
    } catch (e) {
      res.status(500).send();
    }
  });

module.exports = router;
