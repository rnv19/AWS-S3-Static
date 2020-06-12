import React from 'react';

// css imports
import 'bootstrap/dist/css/bootstrap.min.css';

// static imports

// component imports
import NewNavBar from './NewNavBar';
import Instructions from './Instructions';
import TakeTest from './TakeTest';
import ManageTest from './ManageTest';

import { Navbar, Nav } from 'react-bootstrap';
import Summary from './Summary';
const namePointers = {
	ManageTest: 0,
	TakeTest: 1,
	DashBoard: 1,
	Instructions: 2,
	Summary: 3
};

export default class Dashboard extends React.Component {
	state = {
		ActiveStep: 1,
		receivedExamName: ''
	};

	changeActiveStep = (newStepValue) => {
		this.setState({ ActiveStep: newStepValue });
	};

	displayDashBoard = () => {
		this.changeActiveStep(namePointers['DashBoard']);
	};

	displayInstructions = (examName) => {
		this.setState({ receivedExamName: examName });
		this.changeActiveStep(namePointers['Instructions']);
	};

	displaySummary = (examName) => {
		this.setState({ receivedExamName: examName });
		this.changeActiveStep(namePointers['Summary']);
	};

	displayManageTest = () => {
		this.changeActiveStep(namePointers['ManageTest']);
	};

	displayTakeTest = () => {
		this.changeActiveStep(namePointers['TakeTest']);
	};

	getNavBar = ({ manageTestActive, takeTestActive } = {}) => {
		return (
			<NewNavBar
				displayManageTest={this.displayManageTest}
				displayTakeTest={this.displayTakeTest}
				photo={this.props.imageUrl}
				email={this.props.email}
				logoutSuccess={this.props.logoutSuccess}
				manageTestActive={manageTestActive}
				takeTestActive={takeTestActive}
			/>
		);
	};
	getStepContent = (currentStepValue) => {
		switch (currentStepValue) {
			case 0:
				return (
					// display Manage Tests
					<div>
						{this.getNavBar({ manageTestActive: true })}
						<ManageTest author={this.props.name} google_id={this.props.googleId} />
					</div>
				);
			case 1:
				// display take Tests
				return (
					<div>
						{this.getNavBar({ takeTestActive: true })}
						<TakeTest
							displayInstructions={this.displayInstructions}
							displaySummary={this.displaySummary}
							google_id={this.props.googleId}
						/>
					</div>
				);

			case 2:
				// display Instructions
				return (
					<div>
						<Navbar bg='dark' expand='sm' variant='dark'>
							<Navbar.Brand style={{ paddingRight: '1vw' }}>Exam_name</Navbar.Brand>
							<Navbar.Collapse className='justify-content-end'>
								<Nav className='mr-sm-2'>
									<Nav
										disabled
										style={{
											fontWeight: 'light',
											color: 'grey',
											paddingRight: '1vw'
										}}
									>
										{this.props.email}
									</Nav>
									{/* <Nav.Link onClick={() => alert('clicked')}>Home</Nav.Link> */}
									<img alt='vvv' width='40vw' height='auto' src={this.props.imageUrl} />
								</Nav>
							</Navbar.Collapse>
						</Navbar>

						<Instructions displayTakeTest={this.displayTakeTest} examName={this.state.receivedExamName} />
					</div>
				);

			case 3:
				// display Summary
				return (
					<div>
						<Summary displayTakeTest={this.displayTakeTest} examName={this.state.receivedExamName} />
					</div>
				);
			default:
				return <div>yet to implement:</div>;
		}
	};

	render() {
		console.log('image: ', this.props.imageUrl);
		return <div>{this.getStepContent(this.state.ActiveStep)}</div>;
	}
}
