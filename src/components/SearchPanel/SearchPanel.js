import {useState} from "react";
import "./SearchPanel.css";

export default function SearchPanel(props) {
	const setTerm = useState("")[1];

	const valueChange = (e) => {
		const term = e.target.value;
		setTerm(term);
		props.onUpdateSearch(term);
	}
		
	return (
		<input 
		  type="text"
		  className="from-control search-input"
		  placeholder="Search Post...."
		  onChange={valueChange}
		/>
	);
}