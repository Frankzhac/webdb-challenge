const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/projects.db3',
  },
  useNullAsDefault: true, // needed for sqlite
};
const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());

// list all projects
server.get('/projects', async (req, res) => {
  // get the projects from the database
  try {
    const projects = await db('projects'); // all the records from the table
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

// list a project by id
server.get('/projects/:id', async (req, res) => {
  // get the projects from the database
  try {
    const project = await db('projects')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
