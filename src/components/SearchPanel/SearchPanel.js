import {Component} from "react";
import "./SearchPanel.css";

export default class SearchPanel extends Component {
	state = {
		term: ""
	}

	valueChange = (e) => {
		const term = e.target.value;
		this.setState({term});
		this.props.onUpdateSearch(term);
	}

	render() {
		return (
			<input 
			  type="text"
			  className="from-control search-input"
			  placeholder="Search by posts"
			  onChange={this.valueChange}
			/>
		);
	}
}