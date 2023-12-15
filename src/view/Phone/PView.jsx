import React, { useEffect, useState } from "react";
import "./PView.css";
import PPrompt from "../../components/Phone/PPrompt";
import PNotes from "../../components/Phone/PNotes";
import PHome from "../../components/Phone/PHome";

const PView = ({ selected, setSelected }) => {
	const [titles, setTitles] = useState([]);
	const [showPopup, setShowPopup] = useState(false);
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
		setShowPopup(true);
	};

	const handleClose = () => {
		setShowPopup(false);
	};
	return (
		<div className="phone_sidebar">
			<div className="phone_sidebar_title">Pocket Notes</div>
			<div className="phone_sidebar_create_notes_btn">
				<button onClick={handleClick}>
					<span id="add">+</span>
					<span>Create Notes Group</span>
				</button>
			</div>
			<div className="phone_sidebar_notes_title">
				{titles.length > 0 ? (
					titles.map((title, index) => (
						<PNotes
							selected={selected}
							setSelected={setSelected}
							title={title}
							key={index}
						/>
					))
				) : (
					<PHome />
				)}
			</div>
			{showPopup && (
				<div className="phone_prompt_overlay">
					<PPrompt
						onClose={handleClose}
						groupNamesParent={groupNamesParent}
						setGroupNamesParent={setGroupNamesParent}
					/>
				</div>
			)}
		</div>
	);
};

export default PView;
