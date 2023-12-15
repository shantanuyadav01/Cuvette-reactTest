import React, { useEffect, useState } from "react";
import "./DStyles.css";
import DPrompt from "./DPrompt";
import NotesHeading from "./NotesHeading";

const DSidebar = ({ selected, setSelected }) => {
	const [titles, setTitles] = useState([]);
	const [showPrompt, setShowPrompt] = useState(false);
	const [groupNamesParent, setGroupNamesParent] = useState(
		localStorage.getItem("groupNames") || []
	);

	useEffect(() => {
		const data = localStorage.getItem("groupNames");
		if (data) {
			setGroupNamesParent(JSON.parse(data));
		} else {
			setGroupNamesParent([]);
		}
	}, []);

	useEffect(() => {
		if (groupNamesParent.length > 0) {
			const obj = JSON.parse(localStorage.getItem("groupNames"));
			const result = Object.keys(obj).map((key) => [obj[key]]);
			setTitles(result);
		}
	}, [groupNamesParent]);

	const handleClick = () => {
		setShowPrompt(true);
	};

	const handleClose = () => {
		setShowPrompt(false);
	};

	return (
		<div className="desk_sidebar">
			<div className="desk_sidebar_heading">Pocket Notes</div>
			<div className="desk_sidebar_btn">
				<button onClick={handleClick}>
					<span id="add">+</span>
					<span>Create Notes Group</span>
				</button>
			</div>
			<div className="desk_sidebar_notes_heading">
				{titles.length > 0 ? (
					titles.map((title, index) => (
						<NotesHeading
							selected={selected}
							setSelected={setSelected}
							key={index}
							title={title}
						/>
					))
				) : (
					<div className="desk_sidebar_notes_title_empty"></div>
				)}
			</div>
			{showPrompt && (
				<div className="desk_prompt_overlay">
					<DPrompt
						groupNamesParent={groupNamesParent}
						setGroupNamesParent={setGroupNamesParent}
						onClose={handleClose}
					/>
				</div>
			)}
		</div>
	);
};

export default DSidebar;
