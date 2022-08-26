const express = require("express");
const router = express.Router();
const db = require('../models')
router.get("/", (req, res) => {
  res.render("index");
});



//! test endpoints using thunder client before messing with frontend


//!  GET /todos, displays all of the todos
router.get("/todos", async (req, res) => {
  try {
    let records = await db.todos.findAll();
    res.json(records);
  } catch (error) {
    console.log(error)
  }
});


//! GET /todos/:id , displays todos by id
router.get("/todos/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let records = await db.todos.findByPk(id); //{}
    console.log(records)
    res.json(records);
  } catch (error) {
    console.log(error)
  }
});
//! POST /todos, creates a new todo
router.post('/todos', async (req, res) => {
  let todoItem = req.body.description
  // console.log(req.body)
  await db.todos.create({ description: `${todoItem}` })
  let records = await db.todos.findAll();
  res.json(records)
})

// createToDos('lalal')
//! PUT /todos/:id, update a todo item
router.put('/todos/:id', async (req, res) => {
  let id = req.params.id
  let description = req.body.description
  await db.todos.update({ description: description }, { where: { id: id } })
  let records = await db.todos.findAll();
  res.json(records)
})

//! DELETE /todos/:id, delete a todo
router.delete('/todos/:id', async (req, res) => {
  let id = req.params.id
  await db.todos.destroy({ where: { id: id } })
  let records = await db.todos.findAll();
  res.json(records)
})

module.exports = router;
