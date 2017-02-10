import React from "react";
import {render} from "react-dom";
import {Jumbotron, Checkbox, Button} from "react-bootstrap";

import NewRecipe from './add.jsx';
import Recipe from './recipe.jsx';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUSer: null,
			recipes: null,
			chosenRecipe: ''
		}	
		this.firebase = this.props.route.firebase;	
		this.ref = this.firebase.database().ref('recipes');
	}

	componentDidMount() {	
		var self = this;
		this.firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				self.setState({currentUser: user});				
			} else {
				window.location = "/?#/signin";
			}
			return user;
		});	

		this.ref.on('value', snapshot => {
			this.setState({recipes: snapshot});
		});
	}

	pickRandomLink() {
		let recipes = [];
		if (this.state.recipes) {
			this.state.recipes.forEach(snapshot => {
				let value = snapshot.val();
				if (!value.checked) {
					recipes.push(value.link);
				}				
			});
			console.log(recipes)
			if (recipes.length == 0) return;			
			if (recipes.length == 1) {
				this.setState({chosenRecipe: recipes[0]});
			} else {
				let index = Math.round(Math.Random() * recipes.length);
				this.setState({chosenRecipe: recipes[index]});
			}			
		}
	}

	render() {
		let flexChildStyle = {flexGrow: 1, textAlign: 'center'};
		let allRecipes = [];
		let chosen;
		if (this.state.recipes) {
			this.state.recipes.forEach(snapshot => {
				let value = snapshot.val();
				allRecipes.push(<Recipe key={snapshot.key} snapshot={snapshot} link={value.link} checked={value.done}/>)
			});
		}

		if (this.state.chosenRecipe) {			
			chosen = <a href={this.state.chosenRecipe}>{this.state.chosenRecipe}</a>;
		}

		return (
			<div>
				<Jumbotron style={{display: 'flex', justifyContent: 'center'}}>
					<NewRecipe firebase={this.firebase}/>
				</Jumbotron>				
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 100}}>					
					<Button onClick={() => this.pickRandomLink()} style={{width: 200}} bsStyle="info">Randomize</Button>
				</div>
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50, marginBottom: 100}}>					
					<p>{chosen}</p>
				</div>
				<Jumbotron style={{display: 'flex', marginBottom: 0}}>					
					<div style={flexChildStyle}>
						<p>All recipes</p>
						<div>
							{allRecipes}
						</div>
					</div>					
				</Jumbotron>
			</div>
		)
	}
}