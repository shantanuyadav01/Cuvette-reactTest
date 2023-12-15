import React, { useState } from "react";
import "./DView.css";
import DHome from "../../components/Desktop/Home/DHome";
import DSidebar from "../../components/Desktop/DSidebar";
import DNotes from "../../components/Desktop/DNotes";

const DView = () => {
	const [selected, setSelected] = useState("");
	const [notes, setNotes] = useState([]);
	return (
		<div className="desktop">
			<DSidebar selected={selected} setSelected={setSelected} />
			{selected.length > 0 ? (
				<DNotes
					notes={notes}
					setNotes={setNotes}
					selected={selected}
					setSelected={setSelected}
				/>
			) : (
				<DHome />
			)}
		</div>
	);
};

export default DView;
