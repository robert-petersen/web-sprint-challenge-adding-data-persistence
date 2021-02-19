// build your `/api/tasks` router here
const express = require('express');
const Tasks = require('./model.js');
const router = express.Router();

// - [ ] `[POST] /api/tasks`
//   - Even though `task_completed` is stored as an integer, the API uses booleans when interacting with the client
//   - Example of response body: `{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_id:1}`

// - [ ] `[GET] /api/tasks`
//   - Even though `task_completed` is stored as an integer, the API uses booleans when interacting with the client
//   - Each task must include `project_name` and `project_description`
//   - Example of response body: `[{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_name:"bar","project_description":null}]`

router.get("/", (req, res) => {
  Tasks.find()
    .then(tasks => {
      const updatedTasks = tasks.map( task => {
        if ( task.task_completed === 0 ) {
          return ({
            ...task,
            task_completed: false
          });
        } else {
          return ({
            ...task,
            task_completed: true
          });
        }
      })
      res.status(200).json(updatedTasks);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get tasks", error: err.message });
    });
});

router.post("/", (req, res) => {
  const newTask = req.body;
  Tasks.add(newTask)
    .then(task => {
      let translatedTask = task;
      if ( task.task_completed === 0 ) {
        translatedTask = {
          ...task,
          task_completed: false
        };
      } else {
        translatedTask = {
          ...task,
          task_completed: true
        };
      }
      res.status(201).json(translatedTask);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to add task", error: err.message });
    });
});

module.exports = router;