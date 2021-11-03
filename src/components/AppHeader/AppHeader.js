import {Component} from "react";
import "./AppHeader.css";

export default class AppHeader extends Component {
	render() {
		const {posts} = this.props
		const postsLength = posts.length;
		const likesLength = posts.filter(post => post.like === true).length;

		return (
			<div className="app-header d-flex">
				<h1>Posts Media</h1>
				<h2>{postsLength} posts, like {likesLength}</h2>
			</div>
		);
	}
}