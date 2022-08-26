
const express = require('express');
const app = express();

const port = 3000;
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');


// const db = require('./models')

// const createToDos = async () => {
//     await db.todos.create({ description: 'pet the dog' })
//     await db.todos.create({ description: 'pet the cat' })
//     await db.todos.create({ description: 'pet the snake' })
//     await db.todos.create({ description: 'pet the pig' })
// }
// createToDos()
//routes
app.use(require('./routes/index'));

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})