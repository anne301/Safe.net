import React, { Component } from 'react';
import { TextField, withStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { addWebsite } from '../firebase/websiteService';
import { websiteType } from '../utils/constants';


const styles =
{
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
	},
	menu: {
		width: 200,
	},
	add_button: {
		fontSize: 40,
		zIndex: 500,
		margin: '5px 0px 0px 10px',
		cursor: 'pointer',
	}
}

class Form extends Component {

	handleChange = name => event => {
		this.setState({ url: event.target.value });
	};

	handleSubmit = () => {
		let website = {}
		const { url } = this.state;
		const resp = this.postData(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${'AIzaSyDA4k1aKyowBP14Zr0EvLKZ-Lc6Vx9NMT8'}`,
			{
				"client": {
					"clientId": "yourcompanyname",
					"clientVersion": "1.5.2"
				},
				"threatInfo": {
					"threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],
					"platformTypes": ["WINDOWS"],
					"threatEntryTypes": ["URL"],
					"threatEntries": [
						{ "url": url }
					]
				}
			});
		console.log(Boolean(resp));
		if (Object.entries(resp).length === 0 && resp.constructor === Object)
			website = { url, safe: true, type: websiteType.BLOCKED }
		else
			website = { url, safe: true, type: websiteType.BLOCKED }

		addWebsite(website);
		console.log('done')
	}


	postData = (url = '', data = {}) => {
		// Default options are marked with *
		return fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, cors, *same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		})
			.then(response => {
				return response.json();
			}); // parses JSON response into native JavaScript objects 
	}

	render() {
		const { classes } = this.props
		return (
			<form>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<TextField
						id="url"
						label="URL"
						className={classes.textField}
						onChange={this.handleChange('url')}
						margin="normal"
						variant="outlined"
						fullWidth
					/>
					<AddCircleIcon color='primary' className={classes.add_button} onClick={this.handleSubmit} />
				</div>
			</form>);
	}
}

export default withStyles(styles)(Form);