import React from "react";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { LuInbox } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { NavLink } from "react-router";

const items = [
	{
		title: "Dashboard",
		url: "/",
		icon: () => <IoHomeOutline className="w-full h-full" />,
	},
	{
		title: "Tasks Organizer",
		url: "/task-organizer",
		icon: () => <FaTasks className="w-full h-full" />,
	},
	{
		title: "Inbox",
		url: "/inbox",
		icon: () => <LuInbox className="w-full h-full" />,
	},
	{
		title: "Calender",
		url: "/calender",
		icon: () => <SlCalender className="w-full h-full" />,
	},
	{
		title: "Settings",
		url: "/settings",
		icon: () => <IoSettingsOutline className="w-full h-full" />,
	},
];

const AppSidebar = () => {
	return (
		<div
			className={`p-2 space-y-8 min-h-screen border-r border-slate-100 shadow-sm`}
		>
			<Logo />
			<SidebarGroup
				label={"group1"}
				items={items}
			/>
		</div>
	);
};

const Logo = () => {
	return <div className="text-sky-600 text-5xl">Logo</div>;
};

const SidebarGroup = ({ label, items }) => {
	return (
		<nav className="space-y-2">
			<h3 className="uppercase text-slate-400 text-sm ml-3">{label}</h3>

			{items.map((item) => (
				<NavLink
					key={item.title}
					to={item.url}
					className={({ isActive }) =>
						isActive
							? "text-sky-600 bg-sky-100/20 flex items-center gap-2 py-3 pl-3  hover:text-sky-600 transition-colors cursor-pointer hover:bg-sky-100/20"
							: "flex items-center gap-2 py-3 pl-3 text-slate-600 hover:text-sky-600 transition-colors cursor-pointer hover:bg-sky-100/20"
					}
				>
					<div className="size-5">{item.icon()}</div>
					{item.title}
				</NavLink>
			))}
		</nav>
	);
};
export default AppSidebar;
