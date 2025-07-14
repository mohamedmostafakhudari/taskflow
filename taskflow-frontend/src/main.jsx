import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.jsx";
import DashBoard from "./components/DashBoard.jsx";
import TaskOrganizer from "./components/TaskOrganizer.jsx";
import PageNotFound from "./components/PageNotFound.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<App />}
				>
					<Route
						index
						element={<DashBoard />}
					/>
					<Route
						path="/task-organizer"
						element={<TaskOrganizer />}
					/>
					<Route
						path="*"
						element={<PageNotFound />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
