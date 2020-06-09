import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { GoogleLogout } from 'react-google-login';

export default function NavBar(props) {
	return (
		<div>
			<Navbar bg='dark' expanded variant='dark'>
				<Navbar.Brand>{props.navBarTitle}</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse className='justify-content-end'>
					<Nav className='mr-sm-2'>
						<img alt='vvv' width='30px' height='auto' src={props.photo} />
						<NavDropdown title='' id='basic-nav-dropdown' alignRight disabled={props.disableDropDown}>
							<NavDropdown.Item>
								Signed in as:
								<br />
								<p style={{ fontWeight: 'light' }}>chandravamsi.sirapu@msitprogram.net</p>
							</NavDropdown.Item>
							<NavDropdown.Item onClick={props.displayUserProfile}>Your Profile</NavDropdown.Item>
							<NavDropdown.Divider />
							{/* <NavDropdown.Item>Logout </NavDropdown.Item> */}
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
