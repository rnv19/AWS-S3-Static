import React, { Component } from 'react';
import { Tab, Badge, Row, Col, Nav, Spinner } from 'react-bootstrap';
import GetExamStatusTable from './GetExamStatusTable';
import GetExamHistory from './GetExamHistory';

const navLinks = [ 'ExamStatus', 'ExamHistory' ];

export default class ExamContent extends Component {
	state = {
		activeStep: 0
	};

	changeActiveStep = (newStepValue) => {
		this.setState({ activeStep: newStepValue });
	};

	getStepContent = (currentStep) => {
		switch (currentStep) {
			case 0:
				return <GetExamStatusTable displayInstructions={this.props.displayInstructions} />;
			case 1:
				return <GetExamHistory />;
			default:
				break;
		}
	};
	render() {
		return (
			<div>
				{/* Tab section with Badges*/}
				<div
					style={{ width: '80vw', height: '50vh', marginTop: '4vw', marginLeft: '4vw', marginBottom: '4vw' }}
				>
					<Tab.Container id='left-tabs-example' defaultActiveKey='0'>
						{/* <Tab.Container id='left-tabs-example'> */}
						<Row>
							<Col sm={3}>
								<Nav variant='pills' className='flex-column'>
									{navLinks.map((item, index) => (
										<Nav.Item key={index}>
											<Nav.Link
												onClick={() => {
													this.changeActiveStep(index);
												}}
												eventKey={index}
											>
												{item}
												{/* ToDo:Enable the Badge depending on the notification */}
												{/* <Badge variant='success'>New</Badge> */}
											</Nav.Link>
										</Nav.Item>
									))}
								</Nav>
							</Col>
							<Col sm={9}>
								<Tab.Content>
									<Tab.Pane eventKey={this.state.activeStep}>
										{this.getStepContent(this.state.activeStep)}
									</Tab.Pane>
								</Tab.Content>
							</Col>
						</Row>
					</Tab.Container>
				</div>
			</div>
		);
	}
}
