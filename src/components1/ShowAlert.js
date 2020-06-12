import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';

class ShowAlert extends React.Component {
	render() {
		if (this.props.alert.activate_alert) {
			return (
				<Modal show={true} onHide={this.props.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Activate Test</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>Are you sure you want to activate {this.props.exam_name}?</p>
					</Modal.Body>

					<Modal.Footer>
						<Button variant='secondary' onClick={this.props.handleClose}>
							No
						</Button>
						<Button
							variant='success'
							onClick={() => {
								this.props.activate_exam(this.props.exam_name);
							}}
						>
							Yes
						</Button>
					</Modal.Footer>
				</Modal>
			);
		} else if (this.props.alert.end_alert) {
			return (
				<Modal show={true} onHide={this.props.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>End Test</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>Are you sure you want to end {this.props.exam_name}?</p>
					</Modal.Body>

					<Modal.Footer>
						<Button variant='secondary' onClick={this.props.handleClose}>
							No
						</Button>
						<Button variant='success' onClick={() => this.props.end_exam(this.props.exam_name)}>
							Yes
						</Button>
					</Modal.Footer>
				</Modal>
			);
		} else if (this.props.alert.release_alert) {
			return (
				<Modal show={true} onHide={this.props.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Release results</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>Are you sure you want to release the results for {this.props.exam_name}?</p>
					</Modal.Body>

					<Modal.Footer>
						<Button variant='secondary' onClick={this.props.handleClose}>
							No
						</Button>
						<Button variant='success' onClick={() => this.props.release_results(this.props.exam_name)}>
							Yes
						</Button>
					</Modal.Footer>
				</Modal>
			);
		} else {
			return '';
		}
	}
}

export default ShowAlert;
