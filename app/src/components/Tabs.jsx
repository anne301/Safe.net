import React from 'react';
import { makeStyles, Paper, Tabs, Tab } from '@material-ui/core';
import Button from './Button';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	tab_selected: {
		color: '#8c52ff'
	}
});

export default function CenteredTabs({ curTab, handleSelect, handleSignOut }) {
	const classes = useStyles();

	function allyProps(index) {
		return {
			id: `tab-${index}`,
			'aria-controls': `tabpanel-${index}`
		}
	}

	function handleChange(event, index) {
		handleSelect(index);
	}

	return (
		<Paper className={classes.root}>
			<Button text='Logout' classes='logout-button' onClick={handleSignOut} />
			<Tabs
				value={curTab}
				onChange={handleChange}
				TabIndicatorProps={{
					style: {
						backgroundColor: "#8c52ff"
					}
				}}
				centered
			>
				<Tab label="Pending Approval" className={curTab === 0 ? classes.tab_selected : null} {...allyProps(0)} />
				<Tab label="Block List" className={curTab === 1 ? classes.tab_selected : null} {...allyProps(1)} />
			</Tabs>
		</Paper>
	);
}