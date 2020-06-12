import React, { Component } from 'react';
import { Spinner, Button, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class GetAllExams extends Component {
	state = {
		isLoading: true,
		tableData: []
	};

	componentDidMount() {
		this.APICall();
	}

	toggleLoading = () => {
		this.setState({
			isLoading: !this.state.isLoading
		});
	};
	startTest(examName) {
		this.props.displayInstructions(examName);
	}

	GetStatusButton = (ButtonFeature, examName) => {
		switch (ButtonFeature) {
			case 'Not Started':
				return (
					<OverlayTrigger
						placement='bottom'
						overlay={<Tooltip id='tooltip-disabled'>Exam not started</Tooltip>}
					>
						<span className='d-inline-block'>
							<Button disabled style={{ pointerEvents: 'none' }}>
								Yet to start
							</Button>
						</span>
					</OverlayTrigger>
				);
			case 'Started':
				return (
					<Button
						onClick={() => {
							this.startTest(examName);
						}}
					>
						Attemp Test
					</Button>
				);
			case 'Ongoing':
				return <Button>Resume</Button>;
			default:
				return <Button>Error</Button>;
				break;
		}
	};

	DisplayTable = () => {
		if (this.state.tableData.length === 0) {
			return 'No exams for the Day!!!';
		}

		return (
			<Table striped bordered hover size='lg'>
				<thead>
					<tr>
						<th>Test Name</th>
						<th>Test Date</th>
						<th>Time</th>
						<th>Author</th>
						<th>Test status</th>
					</tr>
				</thead>
				<tbody>
					{this.state.tableData.map((eachExam, index) => (
						<tr key={index}>
							<td key={eachExam.exam_name}>{eachExam.exam_name}</td>
							<td>{eachExam.exam_date}</td>
							<td>{eachExam.exam_start_time}</td>
							<td>{eachExam.author}</td>
							<td>{this.GetStatusButton(eachExam.exam_status, eachExam.exam_name)}</td>
						</tr>
					))}
				</tbody>
			</Table>
		);
	};

	APICall = async () => {
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		var raw = JSON.stringify({ google_id: this.props.google_id });
		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			redirect: 'follow',
			body: raw
		};
		try {
			// const response = await fetch('https://v7cm2unj11.execute-api.ap-south-1.amazonaws.com/Dev', requestOptions);
			// console.log('response: ', response);
			// const responseJson = response.json();
			// console.log('responseJson: ', responseJson);
			// this.toggleLoading();
			// this.setState({
			// 	tableData: responseJson
			// });
			fetch('https://v7cm2unj11.execute-api.ap-south-1.amazonaws.com/Dev', requestOptions)
				.then((response) => response.json())
				.then((responseJson) => {
					this.toggleLoading();
					this.setState({
						tableData: responseJson
					});
				});
		} catch (error) {
			this.toggleLoading();
			console.log('error: ', error);
		}
	};
	render() {
		return this.state.isLoading === true ? (
			<div>
				<Spinner animation='border' variant='primary' />
			</div>
		) : (
			<div>{this.DisplayTable()}</div>
		);
	}
}
