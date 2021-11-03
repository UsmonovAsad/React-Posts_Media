import {Component} from "react";
import "./PostStatusFilter.css";

export default class PostStatusFilter extends Component {
	btns = [
		{name:  "All"},
		{name: "Liked"}
	];

	render() {
		const btns = this.btns.map(({name}) => {
			const active = this.props.filter === name;
			const classNames = active ? "btn btn-primary" : "btn btn-outline-secondary";
			return (
				<button
				  onClick={() => this.props.onFilterSelect(name)}
				  key={name} 
				  className={classNames}>
				  		{name}
				 </button>
			);
		})

		return (
			<div className="btn-group">
				{btns}
			</div>
		);
	}
}