import React from "react";
import {render} from "react-dom";
import {Link} from 'react-router';

import {Button} from "react-bootstrap";

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.firebase = this.props.route.firebase;
	}

	componentDidMount() {
		this.firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				window.location = "/?#/";
			} 
		});	
	}

	signIn() {
		this.firebase.auth().signInWithPopup(new this.firebase.auth.GoogleAuthProvider())
			.then(() => {
				window.location = '/?#/';
			})
			.catch(console.error);
	}

	render() {
		const wellStyles = {maxWidth: 400, margin: '0 auto 10px', marginTop: 220};
		return (
			<div>
				<div style={{paddingLeft: 20, paddingTop: 20}}>
					<h1>Recipe Randomizer</h1>
					<p>Decide what to cook tonight.</p>
				</div>				
				<div className="well" style={wellStyles}>
					<Button 
						bsStyle="primary" 
						bsSize="large" 
						block
						onClick={() => this.signIn()}
					>
						Sign in with Google
					</Button>			
				</div>		
			</div>	
		);
	}
}