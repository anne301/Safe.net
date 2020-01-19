import React, { Component } from 'react';
import Button from './../components/Button';
import Logo from '../assets/SafeNet.png';
import '../App.css';

class Login extends Component {

	handleSignIn = () => {
		const { userSession } = this.props;
		userSession.redirectToSignIn();
	};

	render() {
		return (
			<div className='center login-container'>
				<div>
					<h1 className='title'> Safe.net </h1>
					<div>
						<img src={Logo} alt='Safe.net' style={{ width: '200px', height: '200px' }} />
					</div>
					<Button text='Login with Blockstack' onClick={this.handleSignIn} />
				</div>
			</div>
		);
	}
}

export default Login;