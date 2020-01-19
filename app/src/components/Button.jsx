import React from 'react';
import '../App.css';

const Button = ({ text, classes, onClick }) => {
	return (
		<button className={`button ${classes}`} onClick={onClick}>
			<strong>{text}</strong>
		</button>
	);
}

export default Button;