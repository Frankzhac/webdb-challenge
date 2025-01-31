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
  } catch (err) {
    res.status(500).json(err);
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
  } catch (err) {
    res.status(500).json(err);
  }
});

// create projects
server.post('/projects', (req, res) => {
  const newProject = req.body;

  db('projects')
    .insert(newProject)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({
        success: false,
        error: "There was an error while saving the project to the database",
      });
    });
});

// update projects
// PUT
server.put('/projects/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;

  db('projects')
    .where({ id })
    .update(update)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => {
      res.status(200).json({
        errorMessage: "Can't find projects by id."
      });
    });
});

// remove projects
server.delete('/projects/:id', async (req, res) => {
  try {
    const count = await db('projects')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (err) {}
});

// Actions Model
// Get actions
server.get('/actions', async (req, res) => {
  // get the projects from the database
  try {
    const projects = await db('projects'); // all the records from the table
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get the actions from using a project_id
server.get('/projects/:id/actions', async (req, res) => {
  // get the cohorts from the database
  try {
    const action = await db('actions')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(action);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create actions
server.post('/actions', (req, res) => {
  const newAction = req.body;

  db('actions')
    .insert(newAction)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({
        success: false,
        error: "There was an error while saving the action to the database",
      });
    });
});

// UPDATE Actions
server.put('/actions/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;

  db('actions')
    .where({ id })
    .update(update)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => {
      res.status(200).json({
        errorMessage: "Can't find actions by id."
      });
    });
});

// DELETE Actions
server.delete('/actions/:id', async (req, res) => {
  try {
    const count = await db('actions')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (err) {}
});


const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
