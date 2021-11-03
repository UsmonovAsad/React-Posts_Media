import {Component} from "react";
import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import PostStatusFilter from "../PostStatusFilter";
import PostList from "../PostList";
import PostAddForm from "../PostAddForm"
import "./App.css";

export default class App extends Component {
	state = {
		data: [
			{label: "Welcome to ReactJS basic comment application",important: true,like: true,id: 1}
		],
		term: "",
		filter: "All",
		validationAddNewItem: true
	}

	componentDidUpdate() {
		localStorage.setItem("data",JSON.stringify(this.state.data));
		localStorage.setItem("maxId",this.maxId);
	}

	componentDidMount() {
		const data = localStorage.getItem("data");
		const maxId = localStorage.getItem("maxId");
		if (maxId) this.maxId = maxId;
		if (data) this.setState({data: JSON.parse(data)});
	}

	maxId = 2;

	deleteItem = (id) => {
		this.setState(({data}) => {
			const index = data.findIndex(e => e.id === id);
			
			const newData = [...data.slice(0,index),...data.slice(index+1)];

			return {data: newData};
		})
	}

	onAdd = (title) => {
		if (title) {
			const newItem = {
				label: title,
				important: false,
				like: false,
				id: this.maxId++
			}
			this.setState({data: [...this.state.data,newItem]});
			this.setState({validationAddNewItem: true});
		} else {
			this.setState({validationAddNewItem: false});
		}
	}

	onToggleImportant = (id) => {
		this.setState(({data}) => {
			const index = data.findIndex(e => e.id === id);
			const oldItem = data[index];
			const newItem = {...oldItem,important: !oldItem.important};

			const newArr = [...data.slice(0,index),newItem,...data.slice(index+1)];
			return {data: newArr};
		});
	}

	onToggleLiked = (id) => {
		this.setState(({data}) => {
			const index = data.findIndex(e => e.id === id);
			const oldItem = data[index];
			const newItem = {...oldItem,like: !oldItem.like};

			const newArr = [...data.slice(0,index),newItem,...data.slice(index+1)];
			return {data: newArr};
		});
	}

	searchItem = (items,term) => {
		if (!term) return items;

		return items.filter(item => item.label.toLowerCase().includes(term.trim().toLowerCase()));
	}

	onUpdateSearch = (term) => {
		this.setState({term});
	}

	filteredItems = (items,filter) => {
		if (filter === "Liked") {
			return items.filter(item => item.like);
		} else {
			return items;
		}
	}

	onFilterSelect = (filter) => {
		this.setState({filter});
	}

	render() {
		const {data,term,filter,validationAddNewItem} = this.state;
		const elements = this.filteredItems(this.searchItem(data,term),filter);
		return (
			<div className="app-container">
				<div className="app">
					<AppHeader posts={this.state.data} />
					<div className="search-panel d-flex">
						<SearchPanel onUpdateSearch={this.onUpdateSearch} />
						<PostStatusFilter filter={filter} onFilterSelect={this.onFilterSelect} />
					</div>
					<PostList
					  posts={elements}
					  onDelete={this.deleteItem}
					  onToggleImportant={this.onToggleImportant}
					  onToggleLiked={this.onToggleLiked} />
					<PostAddForm onAdd={this.onAdd} validationAddNewItem={validationAddNewItem} />
				</div>
			</div>
		);
	}
}