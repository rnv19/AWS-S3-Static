import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Spinner } from 'react-bootstrap';
import ActionsColumn from './ActionsColumn.js';
import ResultsColumn from './ResultsColumn.js';
import ShowAlert from './ShowAlert.js';

export default class TestInventory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			activate_alert: false,
			end_alert: false,
			release_alert: false,
			exams_list: [],
			exam_pointer: 0,
			view_user_profile: false
		};

		this.get_all_exams = this.get_all_exams.bind(this);
		this.get_all_exams();
		this.activate_exam = this.activate_exam.bind(this);
		this.end_exam = this.end_exam.bind(this);
		this.release_results = this.release_results.bind(this);
	}

	toggleLoading = () => {
		this.setState({
			isLoading: !this.state.isLoading
		});
	};

	get_all_exams() {
		// this.toggleLoading();

		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		var raw = JSON.stringify({ author: this.props.author });
		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			redirect: 'follow',
			body: raw
		};

		fetch('https://ouhi73rklb.execute-api.ap-south-1.amazonaws.com/dev', requestOptions)
			.then((response) => response.json())
			.then((responseJson) => {
				this.toggleLoading();
				this.setState({
					exams_list: responseJson
				});
			})
			.catch((error) => console.log('error', error));
	}

	activate_exam = (exam_name) => {
		// fetchApi()
		this.changeExamStatus(exam_name, 'exam_status', 'Started');
		this.handleClose();
		this.temp_list = this.state.exams_list.filter((exam) => {
			if (exam.exam_name !== exam_name) {
				return exam;
			} else {
				exam.exam_status = 'Started';
				return exam;
			}
		});
		this.setState({ exams_list: this.temp_list });
	};

	end_exam = (exam_name) => {
		// fetchApi()
		this.changeExamStatus(exam_name, 'exam_status', 'Completed');
		this.handleClose();
		this.temp_list = this.state.exams_list.filter((exam) => {
			if (exam.exam_name !== exam_name) {
				return exam;
			} else {
				exam.exam_status = 'Completed';
				return exam;
			}
		});
		this.setState({ exams_list: this.temp_list });
	};

	release_results = (exam_name) => {
		// fetchApi()
		this.changeExamStatus(exam_name, 'result_status', true);
		this.handleClose();
		this.temp_list = this.state.exams_list.filter((exam) => {
			if (exam.exam_name !== exam_name) {
				return exam;
			} else {
				exam.result_status = true;
				return exam;
			}
		});
		this.setState({ exams_list: this.temp_list });
	};

	changeExamStatus = async (exam_name, changeType, changeTo) => {
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		var raw;
		if (changeType === 'exam_status') {
			raw = JSON.stringify({ exam_name: exam_name, exam_status: changeTo });
		} else if (changeType === 'result_status') {
			raw = JSON.stringify({ exam_name: exam_name, result_status: changeTo });
		}
		var requestOptions = {
			method: 'Post',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};
		try {
			fetch('https://sfzjkltov5.execute-api.ap-south-1.amazonaws.com/Dev', requestOptions)
				.then((response) => response.json())
				.then((responseJson) => {
					console.log(responseJson);
				});
		} catch (error) {
			console.log('error: ', error);
		}
	};

	handleClose = () => {
		this.setState({ activate_alert: false, end_alert: false, release_alert: false });
	};

	handleShow = (alert_to_be_shown) => {
		if (alert_to_be_shown === 'activate_alert') {
			this.setState({ activate_alert: true });
		} else if (alert_to_be_shown === 'end_alert') {
			this.setState({ end_alert: true });
		} else {
			this.setState({ release_alert: true });
		}
	};

	set_exam_pointer = (index) => {
		this.setState({ exam_pointer: index });
	};

	render() {
		if (this.state.isLoading) {
			return (
				<div>
					<Spinner animation='border' variant='primary' />
				</div>
			);
		}
		return this.state.exams_list.length === 0 ? (
			<div>You Haven't Created any exams</div>
		) : (
			<div>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Test Name</th>
							<th>Test Date</th>
							<th>Test Actions</th>
							<th>Results</th>
						</tr>
					</thead>
					<tbody>
						{this.state.exams_list.map((exam, index) => (
							<tr>
								<td>{exam.exam_name}</td>
								<td>{exam.exam_date}</td>
								<td>
									<ActionsColumn
										exam_status={exam.exam_status}
										handleShow={this.handleShow}
										set_exam_pointer={this.set_exam_pointer}
										index={index}
									/>
								</td>
								<td>
									<ResultsColumn
										exam_status={exam.exam_status}
										handleShow={this.handleShow}
										set_exam_pointer={this.set_exam_pointer}
										index={index}
										result_status={this.state.exams_list[index].result_status}
									/>
								</td>
								{
									<ShowAlert
										alert={this.state}
										handleClose={this.handleClose}
										handleShow={this.handleShow}
										activate_exam={this.activate_exam}
										end_exam={this.end_exam}
										release_results={this.release_results}
										exam_name={this.state.exams_list[this.state.exam_pointer].exam_name}
									/>
								}
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}
