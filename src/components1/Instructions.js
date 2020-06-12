import React from 'react';
import { Button } from 'react-bootstrap';

export default function name(props) {
	return (
		<div>
			<h1>Instructions of {props.examName}:</h1>
			<ol>
				<li>You can go to DashBoard by clicking "Go to DashBoard"</li>
				<li>The timer will start once you click start the exam.</li>
				<li>
					There will be Four sections (Listening,Reading,Writing,Speaking). You can attempt the test by
					cliking any of the sections. Click "Finish Exam" button to fish the test and go back to dashboard.
				</li>
				<li>submit the answers by cliking the "submit section" Button placed at bottom.</li>
				<li>Don't refresh or close the page untill the exam completes.</li>
				<li>
					The exam will go on for 3hrs..Each question will have 4 options with previous,next and "submit
					section" Buttons placed at bottom.
				</li>
			</ol>

			<Button onClick={props.displayTakeTest}>Go Back</Button>
			<Button>start test</Button>
		</div>
	);
}
