import React from "react";
import {render} from "react-dom";

import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			confirmation: ''
		}

		this.firebase = this.props.firebase;
		this.ref = this.firebase.database().ref('recipes');
	}

	handleFormChange(event) {
		this.setState({inputValue: event.target.value.trim()});
	}

	addRecipe() {
		this.ref.push({link: this.state.inputValue, done: false});
		this.setState({
			confirmation: 'Added!',
			inputValue: ''
		});
		setTimeout(() => {
			this.setState({confirmation: ''})
		}, 3000);
	}

	render() {
		let confirmation;
		if (this.state.confirmation) {
			confirmation = (
				<p 
					style={{flexBasis: '100%', color: 'green', fontSize: '14px', textAlign: 'center', marginTop: 5}}
				>{this.state.confirmation}</p>
			);
		}
		return (
			<div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
				<Form horizontal style={{flexBasis: '100%'}}>
					<FormGroup bsSize="large">
						<p style={{textAlign: 'center'}}>Add a recipe</p>
				    	<FormControl 
				    		type="text" 
				    		style={{width: 600, margin: '0 auto'}} 
				    		value={this.state.inputValue} 
				    		onChange={event => this.handleFormChange(event)}
				    	/>			    	
				    </FormGroup>			    				    
				</Form>				
				<Button style={{width: 100}} onClick={() => this.addRecipe()} block>Add</Button>
				{confirmation}				
			</div>
		);
	}
}