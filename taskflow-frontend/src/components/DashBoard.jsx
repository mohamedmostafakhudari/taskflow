import React from "react";
import Card from "./ui/Card";

const cards = Array.from({ length: 10 });

const DashBoard = () => {
	return (
		<div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-4 px-4">
			{cards.map((card, i) => (
				<Card key={i} />
			))}
		</div>
	);
};

export default DashBoard;
