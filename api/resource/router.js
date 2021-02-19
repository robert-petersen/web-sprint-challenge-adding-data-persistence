// build your `/api/resources` router here
const express = require('express');
const Resources = require('./model.js');
const router = express.Router();

// - [ ] `[POST] /api/resources`
//   - Example of response body: `{"resource_id":1,"resource_name":"foo","resource_description":null}`

// - [ ] `[GET] /api/resources`
//   - Example of response body: `[{"resource_id":1,"resource_name":"foo","resource_description":null}]`

router.get("/", (req, res) => {
  Resources.find()
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get resources", error: err.message });
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;
  Resources.add(newProject)
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to add resource", error: err.message });
    });
});

module.exports = router;