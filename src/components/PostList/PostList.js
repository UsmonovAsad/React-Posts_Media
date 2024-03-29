import "./PostList.css";
import PostListItem from "../PostListItem";

export default function PostList(props) {
	const {posts,onDelete,onToggleImportant,onToggleLiked} = props;
	const elements = posts.map(post => {
		const {id,...postProps} = post;
		return (
			<li key={id} className="list-group-item">
				<PostListItem
				  {...postProps}
				  onDelete={() => onDelete(id)}
				  onToggleImportant={() => onToggleImportant(id)}
				  onToggleLiked={() => onToggleLiked(id)} />
			</li>
		)
	});

	return (
		<ul className="app-list list-group">
			{posts.length ? elements : <h3 className="text-center">no posts  <span className="pl-1">:/</span></h3>}
		</ul>
	);
}