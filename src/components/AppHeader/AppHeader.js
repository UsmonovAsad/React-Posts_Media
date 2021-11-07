import "./AppHeader.css";

export default function AppHeader(props) {
		const {posts} = props
		const postsLength = posts.length;
		const likesLength = posts.filter(post => post.like === true).length;

		return (
			<div className="app-header d-flex">
				<h1>Posts Media</h1>
				<h2>{postsLength} posts, like {likesLength}</h2>
			</div>
		);
}