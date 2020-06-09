import React from 'react';

import photo from '../static/display.jpg';

import { Button } from 'react-bootstrap';
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
export default function UserProfile(props) {
	return (
		<div>
			{/* User Information */}
			<Card style={{ flexDirection: 'row', margin: '30px' }}>
				<CardImg style={{ width: '25vw', height: '60vh' }} src={photo} alt='Profile Photo' />
				<CardBody style={{}}>
					<CardTitle>Name:</CardTitle>
					<CardText>Role:</CardText>
					<CardText>Roll No</CardText>
					<CardText>Email Address:</CardText>
					{/* <CardText>Exams Attempted</CardText>
					<CardText>Exams Passed</CardText> */}
				</CardBody>
			</Card>

			{/* Navigation Button */}
			<div style={{ textAlign: 'center', marginTop: '20px' }}>
				<Button variant='primary' onClick={props.displayDashBoard}>
					Go to DashBoard
				</Button>
			</div>
		</div>
	);
}
