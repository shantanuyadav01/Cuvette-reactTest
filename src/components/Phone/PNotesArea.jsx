import React, { useState, useEffect } from "react";
import "./PStyles.css";
import PNotesContent from "./PNotesContent";
import enter from "../../assets/enter.png";
import back from "../../assets/back.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
const PNotesArea = ({ selected, setSelected, notes, setNotes }) => {
	const [text, setText] = useState("");
	const [bgColor, setBgColor] = useState("#fff");
	const [initials, setInitials] = useState("");
	const [selectedTitle, setSelectedTitle] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		setSelected(localStorage.getItem("selected") || "");
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
	}, [setSelected, setNotes, selected]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSaveNotes();
			setText("");
		}
	};

	const handleSaveNotes = (e) => {
		const notes = JSON.parse(localStorage.getItem(selected)) || [];
		const newNoteObj = {
			id: Date.now(),
			title: selected,
			content: text,
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

	const Back = () => {
		setSelected("");
		navigate("/");
	};
	return (
		<div className="phone_notes_area">
			<div className="phone_notes_content_title">
				<img src={back} alt="back" onClick={Back} />
				<div
					className="phone_notes_content_title_color"
					style={{ backgroundColor: bgColor }}
				>
					{initials}
				</div>
				<div className="phone_notes_content_title_text">{selectedTitle}</div>
			</div>
			<div className="phone_notes_area_body">
				{notes.length === 0 ? (
					<div
						className="phone_notes_area_body_empty"
						style={{ backgroundImage: `url(${logo})` }}
					></div>
				) : (
					<div>
						{notes.map((note, index) => (
							<PNotesContent key={index} note={note} />
						))}
					</div>
				)}
			</div>
			<div className="phone_notes_input">
				<textarea
					value={text}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					placeholder="Enter your notes here..."
				></textarea>
				<img src={enter} alt="enter" onClick={handleSaveNotes} />
			</div>
		</div>
	);
};

export default PNotesArea;
