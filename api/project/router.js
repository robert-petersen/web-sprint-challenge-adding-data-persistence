// build your `/api/projects` router here
const express = require('express');
const Projects = require('./model.js');
const router = express.Router();

// - [ ] `[POST] /api/projects`
//   - Even though `project_completed` is stored as an integer, the API uses booleans when interacting with the client
//   - Example of response body: `{"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}`

// - [ ] `[GET] /api/projects`
//   - Even though `project_completed` is stored as an integer, the API uses booleans when interacting with the client
//   - Example of response body: `[{"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}]`

router.get("/", (req, res) => {
  Projects.find()
    .then(projects => {
      const updatedProjects = projects.map( project => {
        if ( project.project_completed === 0 ) {
          return ({
            ...project,
            project_completed: false
          });
        } else {
          return ({
            ...project,
            project_completed: true
          });
        }
      })
      res.status(200).json(updatedProjects);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get projects", error: err.message });
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;
  Projects.add(newProject)
    .then(project => {
      let translatedProject = project;
      if ( project.project_completed === 0 ) {
        translatedProject = {
          ...project,
          project_completed: false
        };
      } else {
        translatedProject = {
          ...project,
          project_completed: true
        };
      }
      res.status(201).json(translatedProject);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to add project", error: err.message });
    });
});

module.exports = router;