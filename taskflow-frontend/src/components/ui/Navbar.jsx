import { Select } from "@headlessui/react";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
	const [searchValue, setSearchValue] = useState("");
	return (
		<div>
			<div className="flex border-b border-slate-100 py-4">
				<div className="size-8 grid place-items-center text-slate-400">
					<CiSearch className="w-full h-full" />
				</div>
				<input
					type="search"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					placeholder="Search.."
					className="grow  px-2"
				/>
				<div className="flex gap-6 ml-4">
					<Select
						name="abc"
						aria-label="abc"
						className="truncate w-42 px-2 border border-slate-200 rounded-sm text-sm text-slate-500"
					>
						<option value="lorem1">Lorem1abcabcabcabc</option>
						<option value="lorem2">Lorem2</option>
						<option value="lorem3">Lorem3</option>
						<option value="lorem4">Lorem4</option>
					</Select>
					<div className="size-10">
						<img src="https://avatar.iran.liara.run/public" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
