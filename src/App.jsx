import { useState, useEffect } from "react";
import "./App.css";
import DView from "./view/Desktop/DView";
import PView from "./view/Phone/PView";
import PNotesArea from "./components/Phone/PNotesArea";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
	const [dimension, setDimension] = useState(window.innerWidth);
	const [selected, setSelected] = useState("");
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		setSelected(localStorage.getItem("selected") || "");
	}, [selected]);

	const checkDimension = () => {
		setDimension(window.innerWidth);
	};

	window.addEventListener("resize", checkDimension);

	return (
		<div className="App">
			{dimension > 500 ? (
				<DView />
			) : (
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={<PView selected={selected} setSelected={setSelected} />}
						/>
						<Route
							path="/notes"
							element={
								<PNotesArea
									selected={selected}
									setSelected={setSelected}
									notes={notes}
									setNotes={setNotes}
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
