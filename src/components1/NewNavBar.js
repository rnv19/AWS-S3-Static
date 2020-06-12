import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { GoogleLogout } from 'react-google-login';

export default function NewNavBar(props) {
	return (
		<div>
			<Navbar bg='dark' expand='sm' variant='dark' style={{ height: '12vh' }}>
				<Navbar.Brand>Quiz</Navbar.Brand>
				<Nav className='mr-sm-2'>
					<Nav.Link onClick={props.displayManageTest} active={props.manageTestActive}>
						Manage Test
					</Nav.Link>
					<Nav.Link onClick={props.displayTakeTest} active={props.takeTestActive}>
						Take Test
					</Nav.Link>
				</Nav>
				<Navbar.Collapse className='justify-content-end'>
					<Nav className='mr-sm-2'>
						<Navbar.Text>
							{/* <p style={{ fontWeight: 'light', color: 'grey', paddingRight: '1vw' }}> */}
							chandravamsi.sirapu@msitprogram.net
							{/* </p> */}
						</Navbar.Text>
						{/* <Nav.Link onClick={() => alert('clicked')}>Home</Nav.Link> */}
						<img alt='vvv' width='40vw' height='50vh' src={props.photo} />
						<NavDropdown title='' id='basic-nav-dropdown' alignRight>
							<NavDropdown.Item disabled>
								Signed in as:
								<br />
								<p style={{ fontWeight: 'light' }}>{props.email}</p>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<GoogleLogout
									clientId='399787809549-eukv9vkkje6scsgl80ufmdmgk9ebdnod.apps.googleusercontent.com'
									buttonText='Logout'
									onLogoutSuccess={props.logoutSuccess}
									icon={false}
									theme='dark'
								/>
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
