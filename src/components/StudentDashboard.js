import React from 'react';

// css imports
import 'bootstrap/dist/css/bootstrap.min.css';

// static imports
import photo from '../static/display.jpg';

// component imports
import UserProfile from './UserProfile';
import NavBar from './NavBar';
import Instructions from './Instructions';

import ExamContent from './ExamContent';

const namePointers = {
	DashBoard: 0,
	UserProfile: 1,
	Instructions: 2
};

export default class StudentDashboard extends React.Component {
	state = {
		ActiveStep: 0,
		ExamId: ''
	};

	changeActiveStep = (newStepValue) => {
		this.setState({ ActiveStep: newStepValue });
	};

	displayUserProfile = () => {
		this.changeActiveStep(namePointers['UserProfile']);
	};

	displayDashBoard = () => {
		this.changeActiveStep(namePointers['DashBoard']);
	};

	displayInstructions = () => {
		this.changeActiveStep(namePointers['Instructions']);
	};

	getNavBar = (title, disableDropDown) => {
		return (
			<NavBar
				navBarTitle={title}
				displayUserProfile={this.displayUserProfile}
				photo={photo}
				disableDropDown={disableDropDown}
				logoutSuccess={this.props.logoutSuccess}
			/>
		);
	};
	getStepContent = (currentStepValue) => {
		switch (currentStepValue) {
			case 0:
				// display DashBoard
				return (
					<div>
						{this.getNavBar('Student DashBoard', false)}
						<ExamContent displayInstructions={this.displayInstructions} />
					</div>
				);
			case 1:
				// display User profile
				return (
					<div>
						{this.getNavBar('UserProfile', false)}
						<UserProfile displayDashBoard={this.displayDashBoard} />
					</div>
				);
			case 2:
				// display User profile
				return (
					<div>
						{this.getNavBar('Exam_name', true)}
						<Instructions displayDashBoard={this.displayDashBoard} />
					</div>
				);
			default:
				return <div>yet to implement:</div>;
		}
	};

	render() {
		return <div>{this.getStepContent(this.state.ActiveStep)}</div>;
	}
}
