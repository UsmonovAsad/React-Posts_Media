import {Component} from "react";
import "./PostAddForm.css";

export default class PostAddForm extends Component {
	state = {
		title: ""
	}

	onClickBtn = () => {
		this.props.onAdd(this.state.title);

		this.setState({title: ""});
	}

	render() {
		return (
			<div>
				<div className="button-panel d-flex">
					<input
					  type="text"
					  placeholder="Write new post title...."
					  className="from-control new-post-label"
					  value={this.state.title}
					  onChange={(e) => this.setState({title: e.target.value})}
					  onKeyDown={(e) => {if (e.key === "Enter") this.onClickBtn()}}
					/>
					<button
					  onClick={this.onClickBtn}
					  type="button"
					  className="btn btn-outline-secondary">Add Post</button>
				</div>
				{this.props.validationAddNewItem ? "" : <p className="text-danger">Please write something to input</p>}
			</div>
			
		);
	}
}