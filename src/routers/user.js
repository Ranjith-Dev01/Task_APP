const { Router } = require("express");
const express = require("express");
const User = require("../db/models/usermodel");

const router = new express.Router();

// Creating new Users

router.post("/users", async (req, res) => {
    const user = new User(req.body);
  
    try {
      await user.save();
      res.status(201).send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  
  // Fetching Users Data
  
  router.get("/users", async (req, res) => {
    try {
      const user = await User.find({});
      res.send(user);
    } catch (e) {
      res.status(500).send();
    }
  });
  
  // Fetching user by ID
  
  router.get("/users/:id", async (req, res) => {
    const _id = req.params.id;
  
    try {
      const user = await User.findById(_id);
      if (!user) {
        res.status(404).send();
      }
      res.send(user);
    } catch (e) {
      res.status(500).send();
    }
  });
  
  //Updating User using ID
  
  router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedObjects = ["name", "email", "age", "password"];
    const isValidOperation = updates.every((update) =>
      allowedObjects.includes(update)
    );
  
    if (!isValidOperation) {
      res.status(400).send({ error: "Invalid Update" });
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  // Deleting the user using id
  
  router.delete("/users/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
  
      if (!user) {
        res.status(404).send;
      }
      res.send(user);
    } catch (e) {
      res.status(500).send(e);
    }
  });

module.exports = router;
