import React, { useState } from "react";
import "./DStyles.css";

const DPrompt = ({ groupNamesParent, setGroupNamesParent, onClose }) => {
	const [groupName, setGroupName] = useState("");
	const [bgColor, setBgColor] = useState("");

	const handleGroupName = (e) => {
		setGroupName(e.target.value);
	};

	const handleColor = (e) => {
		const div = e.target;
		setBgColor(getComputedStyle(div).backgroundColor);
	};

	const saveName = () => {
		const newGroup = { name: groupName, color: bgColor };
		setGroupNamesParent([...groupNamesParent, newGroup]);
		localStorage.setItem(
			"groupNames",
			JSON.stringify([...groupNamesParent, newGroup])
		);
		onClose();
	};
	return (
		<div className="prompt">
			<div className="prompt_title">Create New Notes Group</div>
			<div className="prompt_input">
				<span>Group Name</span>
				<input
					type="text"
					value={groupName}
					onChange={handleGroupName}
					placeholder="Enter Group Name..."
				/>
			</div>
			<div className="prompt_color_input">
				<span>Choose color</span>
				<div className="prompt_color_input_color">
					<div
						className={`prompt_color_input_color_1 ${
							bgColor === "rgb(179, 139, 250)" ? `highlight` : null
						}`}
						onClick={handleColor}
					></div>
					<div
						className={`prompt_color_input_color_2 ${
							bgColor === "rgb(255, 121, 242)" ? `highlight` : null
						}`}
						onClick={handleColor}
					></div>
					<div
						className={`prompt_color_input_color_3 ${
							bgColor === "rgb(67, 230, 252)" ? `highlight` : null
						}`}
						onClick={handleColor}
					></div>
					<div
						className={`prompt_color_input_color_4 ${
							bgColor === "rgb(241, 149, 118)" ? `highlight` : null
						}`}
						onClick={handleColor}
					></div>
					<div
						className={`prompt_color_input_color_5 ${
							bgColor === "rgb(0, 71, 255)" ? `highlight` : null
						}`}
						onClick={handleColor}
					></div>
					<div
						className={`prompt_color_input_color_6 ${
							bgColor === "rgb(102, 145, 255)" ? `highlight` : null
						}`}
						onClick={handleColor}
					></div>
				</div>
			</div>
			<div className="prompt_close">
				<button onClick={saveName} disabled={groupName.length === 0}>
					Create
				</button>
			</div>
		</div>
	);
};

export default DPrompt;
