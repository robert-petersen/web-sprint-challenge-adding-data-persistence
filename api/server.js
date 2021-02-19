// build your server here and require it from index.js
const express = require('express');
const server = express();
const helmet = require('helmet');
server.use(helmet());
const cors = require('cors')
server.use(cors());
server.use(express.json());

const projectRouter = require('./project/router');
const resourceRouter = require('./resource/router');
const taskRouter = require('./task/router');
server.use('/api/projects', projectRouter);
server.use('/api/resources', resourceRouter);
server.use('/api/tasks', taskRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Welcome</h2>
  `);
});

module.exports = server;