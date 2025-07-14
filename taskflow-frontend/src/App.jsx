import { Outlet } from "react-router";
import Navbar from "./components/ui/Navbar";
import AppSidebar from "./components/ui/AppSidebar";

function App() {
	return (
		<div className="grid grid-cols-[300px_minmax(900px,_1fr)]">
			<div className="col-start-1 row-start-1 row-span-full">
				<AppSidebar />
			</div>
			<div className="px-6">
				<div className="">
					<Navbar />
				</div>
				<div className="mt-4">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default App;
