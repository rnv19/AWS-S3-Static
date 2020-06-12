import React from 'react';
import '../App.css';
import GoogleLogin from 'react-google-login';
import Dashboard from './Dashboard';

class Login extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isSignedIn: false,
			googleId: '',
			userEmail: '',
			userName: '',
			userImageUrl: ''
		};
	}

	dbAddUser(response) {
		console.log('isUserValid called');
		const token_id = response.tokenId;
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		var raw = JSON.stringify({ token: token_id });
		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch('https://mutubyal5k.execute-api.ap-south-1.amazonaws.com/Dev', requestOptions)
			.then((response) => response.json())
			.then((result) => {
				this.setState({
					googleId: result['google_id'],
					userEmail: result['email'],
					userName: result['name'],
					userImageUrl: result['imageUrl'],
					isSignedIn: true
				});
			})
			.catch((error) => console.log('error', error));
	}

	logoutSuccess = () => {
		this.setState({ isSignedIn: false });
	};

	signInFailure = (response) => {
		console.error(response);
		this.setState({ isSignedIn: false });
	};

	signInSuccess = (response) => {
		console.log(response);
		this.dbAddUser(response);
	};

	render() {
		console.log('State: ', this.state);
		const { isSignedIn, googleId, userName, userEmail, userImageUrl } = this.state;
		if (isSignedIn) {
			return (
				<Dashboard
					logoutSuccess={this.logoutSuccess}
					googleId={googleId}
					name={userName}
					email={userEmail}
					imageUrl={userImageUrl}
				/>
			);
		} else {
			return (
				<div className='login-container'>
					<div className='login-button'>
						<GoogleLogin
							clientId='399787809549-eukv9vkkje6scsgl80ufmdmgk9ebdnod.apps.googleusercontent.com'
							buttonText='Login with Google'
							theme='dark'
							disabled={this.state.roleSelected}
							onSuccess={this.signInSuccess}
							onFailure={this.signInFailure}
							isSignedIn={true}
							cookiePolicy={'single_host_origin'}
						/>
					</div>
				</div>
			);
		}
	}
}

export default Login;
