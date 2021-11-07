import {useState,useEffect,useRef} from "react";
import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import PostStatusFilter from "../PostStatusFilter";
import PostList from "../PostList";
import PostAddForm from "../PostAddForm"
import "./App.css";



export default function App() {
	const [data,setData] = useState([{label: "Welcome to ReactJS basic comment application",important: true,like: true,id: 1}]);
	const [term,setTerm] = useState("");
	const [filter,setFilter] = useState("All");
	const [validationAddNewItem,setValidationAddNewItem] = useState(true);
	const maxIdRef = useRef(2);

	useEffect(() => {
			const data = localStorage.getItem("dataOfPostsMediaApp");
			const maxId = localStorage.getItem("maxId");
			if (maxId) maxIdRef.current = maxId;
			if (data) setData(JSON.parse(data));
			console.log("ComponentDidMount")
	},[]);

	useEffect(() => {
		localStorage.setItem("dataOfPostsMediaApp",JSON.stringify(data));
		localStorage.setItem("maxId",maxIdRef.current);
		console.log("ComponentDidUpdate")
	},[data]);

	const deleteItem = (id) => {
		setData(prevData => {
			const index = prevData.findIndex(e => e.id === id);
			
			const newData = [...prevData.slice(0,index),...prevData.slice(index+1)];

			return newData;
		});
	}

	const onAdd = (title) => {
		if (title) {
			const newItem = {
				label: title,
				important: false,
				like: false,
				id: maxIdRef.current++
			}
			setData([...data,newItem]);
			setValidationAddNewItem(true)
		} else {
			setValidationAddNewItem(false);
		}
	}

	const onToggleImportant = (id) => {
		setData(prevData => {
			const index = prevData.findIndex(e => e.id === id);
			const oldItem = prevData[index];
			const newItem = {...oldItem,important: !oldItem.important};

			const newArr = [...prevData.slice(0,index),newItem,...prevData.slice(index+1)];
			return newArr;
		});
	}

	const onToggleLiked = (id) => {
		setData(prevData => {
			const index = prevData.findIndex(e => e.id === id);
			const oldItem = prevData[index];
			const newItem = {...oldItem,like: !oldItem.like};

			const newArr = [...prevData.slice(0,index),newItem,...prevData.slice(index+1)];
			return newArr;
		});
	}

	const searchItem = (items,term) => {
		if (!term) return items;

		return items.filter(item => item.label.toLowerCase().includes(term.trim().toLowerCase()));
	}

	const onUpdateSearch = (term) => {
		setTerm(term);
	}

	const filteredItems = (items,filter) => {
		if (filter === "Liked") {
			return items.filter(item => item.like);
		} else {
			return items;
		}
	}

	const onFilterSelect = (filter) => {
		setFilter(filter);
	}

	const elements = filteredItems(searchItem(data,term),filter);

	return (
		<div className="app-container">
			<div className="app">
				<AppHeader posts={data} />
				<div className="search-panel d-flex">
					<SearchPanel onUpdateSearch={onUpdateSearch} />
					<PostStatusFilter filter={filter} onFilterSelect={onFilterSelect} />
				</div>
				<PostList
				  posts={elements}
				  onDelete={deleteItem}
				  onToggleImportant={onToggleImportant}
				  onToggleLiked={onToggleLiked} />
				<PostAddForm onAdd={onAdd} validationAddNewItem={validationAddNewItem} />
			</div>
		</div>
	);
}