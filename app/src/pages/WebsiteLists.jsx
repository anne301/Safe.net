import React, { Component } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { fetchWebsites, addWebsite, removeWebsite } from './../firebase/websiteService';
import LockIcon from '@material-ui/icons/Lock';
import CloseIcon from '@material-ui/icons/Close';
import Tabs from '../components/Tabs';
import TabPanel from '../components/TabPanel';
import { websiteType } from '../utils/constants';
import Form from '../components/Form';

const tempWebsites = [
	{
		id: 0,
		url: 'https://facebook.com',
		safe: true,
		type: websiteType.PENDING
	},
	{
		id: 1,
		url: 'https://cponline.pw/',
		safe: false,
		type: websiteType.PENDING
	},
	{
		id: 2,
		url: 'www.clubpenguin.com',
		safe: true,
		type: websiteType.BLOCKED
	},
	{
		id: 3,
		url: 'www.google.com',
		safe: false,
		type: websiteType.BLOCKED
	},
]

const styles = {
	tabPanel: {
		padding: '20px',
		margin: '0px 10px',
		textAlign: 'center'
	},
	gridItem: {
		textAlign: 'center',
	},
	container: {
		margin: '20px 0px',
		padding: '20px 0px',
		'&:hover': {
			boxShadow: '0 0 11px rgba(33,33,33,.2)'
		}
	},
	a: {
		fontFamily: 'Roboto',
		textDecoration: 'none',
		cursor: 'pointer',
		fontWeight: '100'
	},
}

class WebsiteLists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curTab: 0,
			pendingList: [],
			blockList: []
		}
		// for (let i = 0; i < tempWebsites.length; i++) {
		// 	addWebsite(tempWebsites[i]);
		// }
	}

	componentDidMount() {
		fetchWebsites(this.handleWebsites);
	}

	handleWebsites = (resp) => {
		const websites = this.formatWebsiteResp(resp);
		this.setState(websites);
		const types = this.sortWebsites(websites);
		this.setState({
			blockList: types[websiteType.BLOCKED],
			pendingList: types[websiteType.PENDING]
		});
	}

	handleDelete = (website) => {
		let updatedWebsites = [];
		const websites = website.type === websiteType.PENDING ?
			this.state.pendingList : this.state.blockList;

		if (websites.length > 1) {
			updatedWebsites = websites.filter(w => w.id !== website.id)
		}

		try {
			removeWebsite(website);
		} catch (ex) {
			alert(ex);
		}
	}

	handleSignOut = () => {
		const { userSession } = this.props;
		userSession.signUserOut();
		window.location = "/";
	};

	handleSelect = (newTab) => {
		this.setState({ curTab: newTab });
	}

	sortWebsites = (websites) => {
		if (!websites || typeof websites[Symbol.iterator] !== 'function')
			return {};

		return websites.reduce((types, website) => {
			if (!types[website.type]) types[website.type] = [];

			types[website.type].push(website);
			return types;
		}, {});
	}

	formatWebsiteResp = (resp) => {
		const websites = Object.keys(resp).map(key => { resp[key]['key'] = key; return resp[key] });
		return websites;
	}

	renderListItems = (items) => {
		const { classes } = this.props;
		if (!items || typeof items[Symbol.iterator] !== 'function') return;

		return (items.map(item => {
			return (
				<React.Fragment>
					<Paper className={classes.container} key={item.key}>
						<Grid container spacing={0}>
							<Grid item xs={8} className={classes.gridItem}>
								{<a href={item.url} target='_blank' rel="noopener noreferrer" className={classes.a}>
									<Typography variant='h6' color='primary'>{item.url} </Typography>
								</a>}
							</Grid>
							<Grid item xs={2} className={classes.gridItem} >
								<LockIcon color={item.safe ? 'primary' : 'error'} style={{ fontSize: 30 }} className={classes.a} />
							</Grid>
							<Grid item xs={2} className={classes.gridItem} >
								<CloseIcon color='error' style={{ fontSize: 30, zIndex: 500 }} className={classes.a} onClick={() => this.handleDelete(item)} />
							</Grid>
						</Grid>
					</Paper>
				</React.Fragment>

			)
		})
		)
	}


	render() {
		const { curTab, pendingList, blockList, websites } = this.state;
		const { classes } = this.props;
		return (
			<React.Fragment>
				<Tabs curTab={curTab} handleSelect={this.handleSelect} handleSignOut={this.handleSignOut} />
				<TabPanel index={0} curIndex={curTab} className={classes.tabPanel}>
					{this.renderListItems(pendingList)}
				</TabPanel>
				<TabPanel index={1} curIndex={curTab}>
					<Form />
					{this.renderListItems(blockList)}
				</TabPanel>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(WebsiteLists);