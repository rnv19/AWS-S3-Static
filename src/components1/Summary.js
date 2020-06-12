import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';

export default function Summary(props) {
	return (
		<div>
			"summary" of {props.examName}
			<Button onClick={props.displayTakeTest}>Go Back</Button>
		</div>
	);
}
