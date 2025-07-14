import React from "react";
import { useEffect, useState } from "react";

// Define the URL of our backend API
const API_URL = "http://localhost:5000/api/tasks";

const TaskOrganizer = () => {
	const [tasks, setTasks] = useState([]);
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [newTaskDescription, setNewTaskDescription] = useState("");

	// Fetch tasks when the component mount
	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		try {
			const response = await fetch(API_URL);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json(); // Parse JSON
			setTasks(data); // Update the tasks state
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	const handleAddTask = async (e) => {
		e.preventDefault();
		if (!newTaskTitle.trim()) {
			alert("Task title cannot be empty!");
			return;
		}

		try {
			const response = await fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: newTaskTitle,
					description: newTaskDescription,
				}),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const addedTask = await response.json();
			setTasks((prevTasks) => [addedTask, ...prevTasks]);
			setNewTaskTitle("");
			setNewTaskDescription("");
		} catch (error) {
			console.error("Error adding task:", error);
		}
	};

	const handleToggleComplete = async (id, currentStatus) => {
		try {
			const response = await fetch(`${API_URL}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ is_completed: !currentStatus }),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const updatedTask = await response.json();
			setTasks(
				tasks.map((task) =>
					task.id === id
						? { ...task, is_completed: updatedTask.is_completed }
						: task
				)
			);
		} catch (error) {
			console.error("Error toggling task status", error);
		}
	};

	const handleDeleteTask = async (id) => {
		try {
			const response = await fetch(`${API_URL}/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			setTasks(tasks.filter((task) => task.id !== id));
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};
	return (
		<>
			<div className="font-sans max-w-xl mx-auto my-5 p-5 border border-gray-500 rounded-lg shadow-black/10 bg-sky-500">
				<h1 className="text-center mb-8 text-4xl tracking-wide font-bold text-white">
					TaskFlow
				</h1>

				<form
					onSubmit={handleAddTask}
					className="flex flex-col gap-3 mb-6 p-4 border border-gray-500 rounded-md bg-white"
				>
					<input
						type="text"
						placeholder="Task Title"
						value={newTaskTitle}
						onChange={(e) => setNewTaskTitle(e.target.value)}
						required
						className="p-3 border border-slate-800 rounded-sm w-full"
					/>
					<textarea
						placeholder="Task Description (optional)"
						value={newTaskDescription}
						onChange={(e) => setNewTaskDescription(e.target.value)}
						className="p-3 border border-slate-800 rounded-sm w-full resize-y min-h-16"
					/>
					<button
						type="submit"
						className="bg-blue-400 text-white py-3 px-5 border border-blue-400 rounded cursor-pointer transition-colors font-bold hover:bg-transparent hover:text-blue-400"
					>
						Add Task
					</button>
				</form>

				{/* Display list of tasks */}
				<div className="">
					{tasks.length === 0 ? (
						<p>No tasks yet! Add one above.</p>
					) : (
						<ul>
							{tasks.map((task) => (
								<li
									key={task.id}
									className={`flex justify-between items-start p-4 mb-3 border border-slate-500 rounded-md transition-all shadow shadow-black/5 hover:bg-gray-500 hover:text-white hover:shadow-md/10 group ${
										task.is_completed
											? "bg-gray-600 line-through text-gray-500 opacity-80"
											: "bg-white"
									}`}
								>
									<span
										onClick={() =>
											handleToggleComplete(task.id, task.is_completed)
										}
										className="grow cursor-pointer pr-4"
									>
										<strong className="block text-[1.1em] text-gray-700 group-hover:text-white">
											{task.title}
										</strong>
										{task.description && (
											<p className="mt-2 text-[0.9em] text-gray-500 group-hover:text-white">
												{task.description}
											</p>
										)}
									</span>
									<button
										onClick={() => handleDeleteTask(task.id)}
										className="bg-red-600 text-white py-2 px-3 border-none rounded-sm cursor-pointer text-sm transition-colors shrink-0 hover:bg-red-800"
									>
										Delete
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	);
};

export default TaskOrganizer;
