import "./PostStatusFilter.css";

export default function PostStatusFilter(props) {
	const btnsObj = [
		{name:  "All"},
		{name: "Liked"}
	];

		const btns = btnsObj.map(({name}) => {
			const active = props.filter === name;
			const classNames = active ? "btn btn-primary" : "btn btn-outline-secondary";
			return (
				<button
				  onClick={() => props.onFilterSelect(name)}
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