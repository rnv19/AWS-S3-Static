import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

class ActionsColumn extends React.Component {
	render() {
		if (this.props.exam_status === 'Not Started') {
			return (
				<Button
					onClick={() => {
						this.props.handleShow('activate_alert');
						this.props.set_exam_pointer(this.props.index);
					}}
				>
					Activate Test
				</Button>
			);
		} else if (this.props.exam_status === 'Started') {
			return (
				<Button
					onClick={() => {
						this.props.handleShow('end_alert');
						this.props.set_exam_pointer(this.props.index);
					}}
				>
					End Test
				</Button>
			);
		} else {
			return <p>completed</p>;
		}
	}
}

export default ActionsColumn;
