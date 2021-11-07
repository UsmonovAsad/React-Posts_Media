import {useState} from "react";
import "./PostAddForm.css";

export default function PostAddForm(props) {
	const [title,setTitle] = useState("");

	const onClickBtn = () => {
		props.onAdd(title);

		setTitle("");
	}

	return (
		<div>
			<div className="button-panel d-flex">
				<input
				  type="text"
				  placeholder="Write new post title...."
				  className="from-control new-post-label"
				  value={title}
				  onChange={(e) => setTitle(e.target.value)}
				  onKeyDown={(e) => {if (e.key === "Enter") onClickBtn()}}
				/>
				<button
				  onClick={onClickBtn}
				  type="button"
				  className="btn btn-outline-secondary">Add Post</button>
			</div>
			{props.validationAddNewItem ? "" : <p className="text-danger">Please write something to input</p>}
		</div>
	);
}