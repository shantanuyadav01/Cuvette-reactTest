import React from "react";
import "./PStyles.css";
import { useNavigate } from "react-router-dom";
const PNotes = ({ title, setSelected }) => {
	const initials = title[0].name
		.toUpperCase()
		.split(" ")
		.map((n) => n[0])
		.join("");
	const newTitle = title[0].name
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
	const navigate = useNavigate();
	const handleTitleClick = () => {
		localStorage.setItem("selected", title[0].name);
		setSelected(title[0].name);
		navigate("/notes");
	};
	return (
		<div className="phone_notes" onClick={handleTitleClick}>
			<div
				className="phone_notes_logo"
				style={{ backgroundColor: title[0].color }}
			>
				{initials}
			</div>
			<div className="phone_notes_title">{newTitle}</div>
		</div>
	);
};

export default PNotes;
