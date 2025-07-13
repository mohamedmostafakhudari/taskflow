require("dotenv").config(); // Load environment variables from .env

const express = require("express"); // Import the Express framework
const { Pool } = require("pg"); // Import the Pool object from pg for database connections
const cors = require("cors"); // Import the CORS middleware

const app = express(); // Initialize the Express application
const port = 5000; // Define the port our backend server will listen to

// --- Middleware ---
app.use(cors()); // Enable CORS for all routes, allowing cross-origin requests from our frontend
app.use(express.json()); // Enable Express to parse incoming JSON request bodies

// --- PostgreSQL Database Pool Setup ---
// A connection pool manages multiple connections to the database, improving performance
// by reusing connections instead of opening a new one for every request.

const pool = new Pool({});

// Test database connection
pool.connect((err, client, release) => {
	if (err) {
		return console.error("Error acquiring client", err.stack);
	}
	client.query("SELECT NOW()", (err, result) => {
		release(); // Release the client back to the pool
		if (err) {
			return console.error("Error executing query", err.stack);
		}
		console.log("Database connected successfully:", result.rows[0].now);
	});
});

// --- API Endpoints (Routes) ---

app.get("/api/tasks", async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT * FROM tasks ORDER BY created_at DESC"
		);
		res.json(result.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
app.post("/api/tasks", async (req, res) => {
	try {
		const { title, description } = req.body;
		if (!title) {
			return res.status(400).json({ msg: "Title is required" });
		}
		const result = await pool.query(
			"INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
			[title, description] // $1, $2 are placeholders to prevent SQL injection
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
app.put("/api/tasks/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description, is_completed } = req.body;

		const result = await pool.query(
			"UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), is_completed = COALESCE($3, is_completed) WHERE id = $4 RETURNING *",
			[title, description, is_completed, id]
		);
		if (result.rows.length === 0) {
			return res.status(404).json({ msg: "Task not found" });
		}
		res.json(result.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
app.delete("/api/tasks/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await pool.query(
			"DELETE FROM tasks WHERE id = $1 RETURNING *",
			[id]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ msg: "Task not found" });
		}
		res.json({ msg: "Task deleted successfully" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// --- Initiate the Server ---
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
