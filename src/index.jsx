import React from "react";
import {render} from "react-dom";

import App from "./app.jsx";
import SignIn from "./signin.jsx";

import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import * as firebase from 'firebase';

// Initialize Firebase
var config = {
apiKey: "AIzaSyBMF3Ur-b0l3ALNqm2LvpzT9OaYTb9Lfkc",
authDomain: "recipe-randomizer-1b15c.firebaseapp.com",
databaseURL: "https://recipe-randomizer-1b15c.firebaseio.com",
storageBucket: "recipe-randomizer-1b15c.appspot.com",
messagingSenderId: "37790024839"
};
firebase.initializeApp(config);

var router = (
	<Router history={hashHistory}>
		<Route path="/" firebase={firebase} component={App}></Route>
		<Route path="/signin" firebase={firebase} component={SignIn}></Route>
	</Router>
);

render(router, document.getElementById("app"));