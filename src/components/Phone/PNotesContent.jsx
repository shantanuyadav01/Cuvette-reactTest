import React from "react";
import "./PStyles.css";

const PNotesContent = ({ note }) => {
	return (
		<div className="phone_notes_content_body">
			<div className="phone_notes_content_date_time">
				<div className="phone_notes_content_date">{note.date}</div>
				<div className="phone_notes_content_time">{note.time}</div>
			</div>
			<div className="phone_notes_content_details">
				<p>{note.content}</p>
			</div>
		</div>
	);
};

export default PNotesContent;
