import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

class ResultsColumn extends React.Component {

    render() {
            if(this.props.exam_status === "Completed" && this.props.result_status) {
                return(<Button>View Results</Button>)
            } else  if (this.props.exam_status === "Completed") {
                return(<Button onClick={() => {this.props.handleShow("release_alert")
                this.props.set_exam_pointer(this.props.index)}}>Release results</Button>)
            } else {
                return(<OverlayTrigger placement='bottom' overlay={<Tooltip id='tooltip-disabled'>Test is not yet finished</Tooltip>}>
                            <span >
                                <Button disabled style={{ pointerEvents: 'none'}}>Release results</Button>
                            </span>
						</OverlayTrigger>)
            }
    }
}

export default ResultsColumn;