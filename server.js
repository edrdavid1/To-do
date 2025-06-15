import express from 'express';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
const DB_PATH = join(__dirname, 'db.json');

app.use(cors({
  origin: 'http://localhost:5176',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

const readDB = async () => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { todos: [] };
  }
};

const writeDB = async (data) => {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
};

app.get('/api/todos', async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const db = await readDB();
    const newTodo = {
      id: Date.now(),
      todo: req.body.todo,
      completed: false,
      userId: 1
    };
    db.todos.push(newTodo);
    await writeDB(db);
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const db = await readDB();
    const todo = db.todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    Object.assign(todo, req.body);
    await writeDB(db);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const db = await readDB();
    const index = db.todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    db.todos.splice(index, 1);
    await writeDB(db);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 