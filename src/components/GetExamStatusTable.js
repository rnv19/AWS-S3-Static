import React, { Component } from 'react';
import { Spinner, Button, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class GetExamStatusTable extends Component {
	state = {
		isLoading: false,
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
	handleEdit = (e) => {
		e.preventDefault();
		console.log(e.target.exam_name);
	};

	startTest(index) {
		console.log('start Exam with index: ', index);
		this.props.displayInstructions();
	}

	GetStatusButton = (ButtonFeature, index) => {
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
							this.startTest(index);
						}}
					>
						Attemp Test
					</Button>
				);
			case 'Ongoing':
				return <Button>Resume</Button>;
			default:
				break;
		}
	};

	DisplayTable = () => {
		return (
			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th>Test Name</th>
						<th>Exam status</th>
					</tr>
				</thead>
				<tbody>
					{this.state.tableData.map((eachExam, index) => (
						<tr>
							<td key={eachExam.exam_name}>{eachExam.exam_name}</td>
							<td>{this.GetStatusButton(eachExam.exam_status, index)}</td>
						</tr>
					))}
				</tbody>
			</Table>
		);
	};

	APICall = async () => {
		this.toggleLoading();
		console.log('Api call started');
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		var requestOptions = {
			method: 'Get',
			headers: myHeaders,
			redirect: 'follow'
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
