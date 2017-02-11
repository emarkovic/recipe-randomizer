import React from "react";
import {render} from "react-dom";

import {Checkbox} from 'react-bootstrap';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {			
			checked: this.props.checked
		}
	}

	checkboxClicked() {
		let checked = this.state.checked;
		//update is not working
		this.props.snapshot.ref.update({
			done: !checked
		});

		this.setState({
			checked: !this.state.checked
		});		
	}

	render() {
		let content;		
		if (this.props.link) {			
			content = (
				<Checkbox checked={this.state.checked} onClick={() => this.checkboxClicked()}>
					<a href={this.props.link} target="_blank">{this.props.link}</a>
				</Checkbox>
			);
		}
		return (
			<div>
				{content}
			</div>
		);
	}
}