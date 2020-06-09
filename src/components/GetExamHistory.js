import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';

function GetResultButton(ButtonFeature) {
	switch (ButtonFeature) {
		case 'Not Released':
			return (
				<OverlayTrigger placement='bottom' overlay={<Tooltip id='tooltip-disabled'>Exam not started</Tooltip>}>
					<span className='d-inline-block'>
						<Button disabled style={{ pointerEvents: 'none' }}>
							Summary
						</Button>
					</span>
				</OverlayTrigger>
			);
		case 'Released':
			return <Button>Summary</Button>;
		default:
			break;
	}
}

export default function GetExamHistory() {
	return (
		<div>
			{/* Exam History*/}
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Test Name</th>
						<th>Exam Date</th>
						<th>Exam Staus</th>
						<th>Results</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Tofel 1</td>
						<td>06/06/2020</td>
						<td>attempted</td>
						<td>
							<OverlayTrigger
								placement='bottom'
								overlay={<Tooltip id='tooltip-disabled'>Results not published</Tooltip>}
							>
								<span className='d-inline-block'>
									<Button disabled style={{ pointerEvents: 'none' }}>
										summary
									</Button>
								</span>
							</OverlayTrigger>
						</td>
					</tr>
					<tr>
						<td>Tofel 1</td>
						<td>06/06/2020</td>
						<td>not attempted</td>
						<td>
							<Button>summary</Button>
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}
