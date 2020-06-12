import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';

class GetExamHistory extends Component {
	state = {
		isLoading: true,
		examHistory: []
	};

	componentDidMount() {
		this.APICall();
	}

	toggleLoading = () => {
		this.setState({
			isLoading: !this.state.isLoading
		});
	};

	viewResults(examName) {
		this.props.displaySummary(examName);
	}

	GetResultButton = (ButtonFeature, index) => {
		if (ButtonFeature) {
			return (
				<Button
					onClick={() => {
						this.viewResults(index);
					}}
				>
					Summary
				</Button>
			);
		} else {
			return (
				<OverlayTrigger placement='bottom' overlay={<Tooltip id='tooltip-disabled'>Exam not started</Tooltip>}>
					<span className='d-inline-block'>
						<Button disabled style={{ pointerEvents: 'none' }}>
							Summary
						</Button>
					</span>
				</OverlayTrigger>
			);
		}
	};

	DisplayTable = () => {
		if (this.state.examHistory.length === 0) {
			return "You haven't Taken any exams";
		}
		return (
			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th>Test Name</th>
						<th>Test Date</th>
						<th>Author</th>
						<th>Exam Type</th>
						<th>Results</th>
					</tr>
				</thead>
				<tbody>
					{this.state.examHistory.map((eachExam, index) => (
						<tr key={index}>
							<td key={eachExam.exam_name}>{eachExam.exam_name}</td>
							<td>{eachExam.exam_date}</td>
							<td>{eachExam.author}</td>
							<td>{eachExam.exam_type}</td>
							<td>{this.GetResultButton(eachExam.result_status, eachExam.exam_name)}</td>
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
			fetch('https://dc9jgnghjj.execute-api.ap-south-1.amazonaws.com/Dev', requestOptions)
				.then((response) => response.json())
				.then((result) => {
					this.toggleLoading();
					this.setState({ examHistory: result });
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

export default GetExamHistory;
