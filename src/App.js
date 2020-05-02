import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import ListItems from './ListItems.js';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			currentItem: {
				text: '',
				key: '',
				isComplete: false,
				isDisplay: true
			},
			showMenu: false
		};
		this.handleInput = this.handleInput.bind(this);
		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.setUpdate = this.setUpdate.bind(this);
		this.completeItem = this.completeItem.bind(this);
		this.showMenu = this.showMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.filterTodo = this.filterTodo.bind(this);
	}

	handleInput(e) {
		this.setState({
			currentItem: {
				text: e.target.value,
				key: Date.now(),
				isComplete: false,
				isDisplay: false
			}
		});
	}
	addItem(e) {
		e.preventDefault();
		const newItem = this.state.currentItem;
		if (newItem.text != '') {
			const newItems = [ ...this.state.items, newItem ];
			this.setState({
				items: newItems,
				currentItem: {
					text: '',
					key: '',
					isComplete: false,
					isDisplay: false
				}
			});
		}
	}
	deleteItem(key) {
		const filteredItems = this.state.items.filter((item) => item.key !== key);
		this.setState({ items: filteredItems });
	}
	setUpdate(text, key) {
		const items = this.state.items;
		items.map((item) => {
			if (item.key === key) {
				item.text = text;
			}
		});
		this.setState({ items: items });
	}
	completeItem(key) {
		const items = this.state.items;
		items.map((item) => {
			if (item.key === key) {
				item.isComplete = !item.isComplete;
			}
		});
		this.setState({ items: items });
	}

	showMenu(event) {
		event.preventDefault();

		this.setState({ showMenu: true }, () => {
			document.addEventListener('click', this.closeMenu);
		});
	}

	closeMenu() {
		this.setState({ showMenu: false }, () => {
			document.removeEventListener('click', this.closeMenu);
		});
	}
	filterTodo(e) {
		const items = this.state.items;
		items.map((item) => {
			switch (e.target.value) {
				case 'all':
					item.isDisplay = false;
					break;
				case 'completed':
					if (item.isComplete === false) item.isDisplay = true;
					if (item.isComplete === true) item.isDisplay = false;
					break;
				case 'not-completed':
					if (item.isComplete === true) item.isDisplay = true;
					if (item.isComplete === false) item.isDisplay = false;
					break;
			}
		});
	}
	render() {
		return (
			<div>
				<header>
					<h1>Tasks</h1>
				</header>
				<form onSubmit={this.addItem}>
					<input
						type="text"
						placeholder="Enter task!"
						className="todo-input"
						value={this.state.currentItem.text}
						onChange={this.handleInput}
					/>
					<button className="todo-button" type="sumbit">
						<FontAwesomeIcon icon={faPlusSquare} />
					</button>
					<div className="filter">
						<button onClick={this.showMenu} className="filter-btn">
							<FontAwesomeIcon icon={faEye} />
						</button>
						{this.state.showMenu ? (
							<div
								className="menu"
								ref={(element) => {
									this.dropdownMenu = element;
								}}
							>
								<button value="all" onClick={this.filterTodo}>
									All
								</button>
								<button value="completed" onClick={this.filterTodo}>
									Completed
								</button>
								<button value="not-completed" onClick={this.filterTodo}>
									Incomplete
								</button>
							</div>
						) : null}
					</div>
				</form>

				<div className="todo-container">
					<ul className="todo-list">
						<ListItems
							items={this.state.items}
							deleteItem={this.deleteItem}
							setUpdate={this.setUpdate}
							completeItem={this.completeItem}
							isComplete={this.state.isComplete}
						/>
					</ul>
				</div>
			</div>
		);
	}
}
export default App;
