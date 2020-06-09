import React from 'react';
// import './App.css'
import GoogleLogin from 'react-google-login';
import FacultyDashboard from './FacultyDashboard';
import StudentDashboard from './StudentDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Alert from 'react-bootstrap/Alert';

class Login extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			role: null,
			isSignedIn: false,
			dropdownText: 'You are?',
			dropDownrole: '',
			roleSelected: true,
			notAuthorised: false
		};
	}

	isUserValid(response) {
		console.log('isUserValid called');
		const { dropdownText } = this.state;
		const token_id = response.tokenId;
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		var raw = JSON.stringify({ token: token_id, table_name: dropdownText });
		console.log(raw);
		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch('https://ava9wxofc6.execute-api.ap-south-1.amazonaws.com/dev', requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				if (result === 'not_authorizd') {
					console.log('inside not auth');
					console.log(typeof result);
					// this.setState({ role: result })
					this.setState({ notAuthorised: true });
				} else {
					this.setState({
						role: result['role'],
						isSignedIn: true
					});
				}
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
		this.isUserValid(response);
	};

	changeDropdownText = (text) => {
		console.log('changeDropDownText called');
		this.setState({ dropdownText: text, dropDownrole: text, roleSelected: false });
	};

	render() {
		console.log('State: ', this.state);
		const { isSignedIn, role, dropdownText } = this.state;
		if (isSignedIn) {
			if (role === 'student') {
				return <StudentDashboard logoutSuccess={this.logoutSuccess} />;
			} else if (role === 'faculty') {
				return <FacultyDashboard logoutSuccess={this.logoutSuccess} />;
			} else return <Login />;
		} else {
			return (
				<div className='login-container'>
					<div>
						{this.state.notAuthorised && alert('Not Authorised!! Please select student from dropdown!!')}
					</div>
					<div className='role-dropdown'>
						<DropdownButton id='dropdown-basic-button' size='lg' title={dropdownText}>
							<Dropdown.Item onSelect={() => this.changeDropdownText('student')}>Student</Dropdown.Item>
							<Dropdown.Item onSelect={() => this.changeDropdownText('faculty')}>Faculty</Dropdown.Item>
						</DropdownButton>
					</div>
					<div className='login-button'>
						<GoogleLogin
							clientId='399787809549-eukv9vkkje6scsgl80ufmdmgk9ebdnod.apps.googleusercontent.com'
							buttonText='Login with Google'
							theme='dark'
							disabled={this.state.roleSelected}
							onSuccess={this.signInSuccess}
							onFailure={this.signInFailure}
							cookiePolicy={'single_host_origin'}
						/>
					</div>
				</div>
			);
		}
	}
}

export default Login;
