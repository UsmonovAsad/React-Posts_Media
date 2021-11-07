import "./PostListItem.css";

export default function PostListItem(props) {
		const {label,onDelete,onToggleImportant,onToggleLiked,important,like} = props;

		let classNames = "app-list-item d-flex justify-content-between";

		if(important) classNames += " important";
		if(like) classNames += " like";

		return (
			<div className={classNames}>
				<span onClick={onToggleLiked} className="app-list-item-label">
					{label}
				</span>
				<div className="d-flex jsutify-content-center align-items-center">
					<button 
					className="btn-star btn-sm"
					onClick={onToggleImportant}>
						<i className="fas fa-star"></i>
					</button>
					<button onClick={onDelete} className="btn-trash btn-sm">
						<i className="fas fa-trash"></i>
					</button>
					<i className="fas fa-heart"></i>
				</div>
			</div>
		);
}