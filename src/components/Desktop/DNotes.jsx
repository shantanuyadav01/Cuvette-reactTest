import React, { useState, useEffect } from "react";
import "./DStyles.css";
import DNotesContent from "./DNotesContent";
import enter from "../../assets/enter.png";

const DNotes = ({ notes, setNotes, selected, setSelected }) => {
	const [text, setText] = useState("");
	const [bgColor, setBgColor] = useState("#fff");
	const [initials, setInitials] = useState("");
	const [selectedTitle, setSelectedTitle] = useState("");

	useEffect(() => {
		setNotes(JSON.parse(localStorage.getItem(selected)) || []);
		const groupNames = JSON.parse(localStorage.getItem("groupNames"));
		const selectedGroup = groupNames.find((group) => group.name === selected);
		if (selectedGroup) {
			setBgColor(selectedGroup.color);
			setInitials(
				selectedGroup.name
					.split(" ")
					.map((word) => word.charAt(0))
					.join("")
					.toUpperCase()
			);
			setSelectedTitle(
				selectedGroup.name
					.split(" ")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" ")
			);
		}
	}, [selected, setNotes]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSaveNotes();
		}
	};

	const handleSaveNotes = () => {
		if (!text.trim()) {
			return;
		}
		const notes = JSON.parse(localStorage.getItem(selected)) || [];
		const newNoteObj = {
			id: Date.now(),
			title: selected,
			content: text.trim(),
			date: new Date().toLocaleDateString("en-GB", {
				day: "numeric",
				month: "numeric",
				year: "numeric",
			}),
			time: new Date().toLocaleTimeString(),
		};
		notes.push(newNoteObj);
		localStorage.setItem(selected, JSON.stringify(notes));
		setText("");
		setNotes(notes);
	};

	const handleChange = (e) => {
		setText(e.target.value);
	};

	return (
		<div className="desk_notes">
			<div className="desk_notes_title">
				<div
					className="desk_notes_title_color"
					style={{ backgroundColor: bgColor }}
				>
					{initials}
				</div>
				<div className="desk_notes_title_text">{selectedTitle}</div>
			</div>
			<div className="desk_notes_content">
				{notes && notes.length > 0
					? notes.map((note, index) => (
							<DNotesContent key={index} note={note} />
					  ))
					: null}
			</div>
			<div className="desk_notes_input">
				<textarea
					value={text}
					placeholder="Enter your notes here"
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				></textarea>
				<img src={enter} alt="enter" onClick={handleSaveNotes} />
			</div>
		</div>
	);
};

export default DNotes;
