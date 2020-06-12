import React, { Component } from 'react';
import { Tab, Row, Col, Nav, Badge, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import photo from '../static/display.jpg';

class Sample extends Component {
	state = {};
	render() {
		return (
			<div>
				<Navbar bg='dark' variant='dark'>
					<Navbar.Brand href='#home'>Navbar</Navbar.Brand>
					<Nav className='mr-sm-2'>
						<Nav.Link href='#home'>Home</Nav.Link>
						<Nav.Link href='#features'>Features</Nav.Link>
						<Nav.Link href='#pricing'>Pricing</Nav.Link>
					</Nav>
				</Navbar>
			</div>
		);
	}
}

export default Sample;
