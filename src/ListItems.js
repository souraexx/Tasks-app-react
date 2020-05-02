import React, { useState } from 'react';
import './ListItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import FlipMove from 'react-flip-move';
function ListItems(props) {
	const items = props.items;
	const listItems = items.map((item) => {
		return (
			<div className={item.isDisplay ? 'noDisplay' : item.isComplete ? 'completed' : 'todo'} key={item.key}>
				<li className="todo-item">
					<input
						className="list-input"
						type="text"
						id={item.key}
						value={item.text}
						onChange={(e) => {
							props.setUpdate(e.target.value, item.key);
						}}
					/>
				</li>
				<button className="complete-btn" onClick={() => props.completeItem(item.key)}>
					<FontAwesomeIcon icon={faCheck} />
				</button>
				<button className="trash-btn" onClick={() => props.deleteItem(item.key)}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
		);
	});
	return (
		<div>
			<FlipMove duration={300} easing="ease-in-out">
				{listItems}
			</FlipMove>
		</div>
	);
}
export default ListItems;
