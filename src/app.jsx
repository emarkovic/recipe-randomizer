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
		});	

		this.ref.on('value', snapshot => {
			this.setState({recipes: snapshot});
		});
	}

	handleLogOut() {
		this.firebase.auth().signOut();
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
			if (recipes.length == 0) return;			
			if (recipes.length == 1) {
				this.setState({chosenRecipe: recipes[0]});
			} else {
				let index = Math.round(Math.random() * recipes.length);
				console.log(recipes[index])
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
		//<div></div>
		return (
			<div style={{height: '100vh'}}>
				<div style={{width: '100%', backgroundColor: '#eee', paddingTop: 5, paddingRight: 5, textAlign: 'right'}}>
					<Button onClick={() => this.handleLogOut()}>Log Out</Button>
				</div>				
				<Jumbotron style={{display: 'flex', justifyContent: 'center', marginBottom: 0}}>					
					<NewRecipe firebase={this.firebase}/>
				</Jumbotron>	
				
				<div className="content" style={{display: 'flex', height: '100%'}}>
					<div className="all-recipes" style={{flexBasis: '50%', borderRight: '1px solid #eee', paddingTop: 20}}>
						<h2 style={{textAlign: 'center', marginBottom: 20}}>All recipes</h2>
						<div style={{paddingLeft: 40}}>
							{allRecipes}
						</div>						
					</div>
					<div className="randomizer" style={{flexBasis: '50%'}}>

						<div style={{display: 'flex', height: 200, justifyContent: 'center', alignItems: 'center'}}>
							<Button onClick={() => this.pickRandomLink()} style={{width: 200, height: 40}} bsStyle="info">
								Pick a random recipe.
							</Button>
						</div>		
						<h3 style={{textAlign: 'center'}}>{chosen}</h3>				
					</div>
				</div>				
			</div>
		)
	}
}
