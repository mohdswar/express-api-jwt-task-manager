const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Task = require('../models/task.js');
const router = express.Router();

// ========== Public Routes ===========

router.get('/', async (req, res) => {
    try {
      const tasks = await Task.find({}).populate('author').sort({ createdAt: 'desc' });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json(error);
    }
  });

router.get('/:taskId', async (req, res) => {
try {
const task = await Task.findById(req.params.taskId).populate(['author','comments.author',]);
res.status(200).json(task);
} catch (error) {
res.status(500).json(error);
}
});

// ========= Protected Routes =========

router.use(verifyToken);

router.post('/', async (req, res) => {
    try {
      req.body.author = req.user._id;
      const task = await Task.create(req.body);
      task._doc.author = req.user;
      res.status(201).json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
});

router.put('/:taskId', async (req, res) => {
try {
    // Find the Task:
    const task = await Task.findById(req.params.taskId);

    // Check permissions:
    if (!task.author.equals(req.user._id)) {
    return res.status(403).send("You're not allowed to do that!");
    }

    // Update Task:
    const updatedTask = await Task.findByIdAndUpdate(
    req.params.taskId,
    req.body,
    { new: true }
    );

    // Append req.user to the author property:
    updatedTask._doc.author = req.user;

    // Issue JSON response:
    res.status(200).json(updatedTask);
} catch (error) {
    res.status(500).json(error);
}
});

router.delete('/:taskId', async (req, res) => {
    try {
      const task = await Task.findById(req.params.taskId);
  
      if (!task.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
      res.status(200).json(deletedTask);
    } catch (error) {
      res.status(500).json(error);
    }
});

router.post('/:taskId/comments', async (req, res) => {
    try {
      req.body.author = req.user._id;
      const task = await Task.findById(req.params.taskId);
      task.comments.push(req.body);
      await task.save();
  
      // Find the newly created comment:
      const newComment = task.comments[task.comments.length - 1];
  
      newComment._doc.author = req.user;
  
      // Respond with the newComment:
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json(error);
    }
});

router.delete('/:taskId/comments/:commentId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    task.comments.remove({ _id: req.params.commentId });
    await task.save();
    res.status(200).json({ message: 'Ok' });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:taskId/comments/:commentId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    const comment = task.comments.id(req.params.commentId);
    comment.text = req.body.text;
    await task.save();
    res.status(200).json({ message: 'Ok' });
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;