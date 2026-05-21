const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// ---------- DATA ----------
let tasks = [
  { id: 1, title: "Learn Backend" },
  { id: 2, title: "Build Project" }
];

// ---------- API ----------

// GET
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// POST
app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title
  };

  tasks.push(newTask);
  res.json(newTask);
});

// PUT (EDIT)
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.map(task =>
    task.id === id ? { ...task, title: req.body.title } : task
  );

  res.json({ message: "updated" });
});

// DELETE
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter(task => task.id !== id);

  res.json({ message: "deleted" });
});

// ---------- FRONTEND ----------
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ---------- SERVER ----------
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});