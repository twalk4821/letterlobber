import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeContainer from './containers/homeContainer.js'
import ComposeContainer from './containers/composeContainer.js'
import FinalContainer from './containers/finalContainer.js'


export default (props) => (
  <Switch>
	  <Route path="/" exact render={() => (
	  	<HomeContainer 
	  	setSender={props.setSender} 
	  	setActiveItem={props.setActiveItem}
	  	/>
	  )}/>
	  <Route path="/compose" render={() => (
	  	<ComposeContainer 
	  	sender={props.sender} 
	  	representative={props.representative}
	  	updatePathToLetter={props.updatePathToLetter}
	  	/>
	  )}/>
	  <Route path="/final" render={() => (
	  	<FinalContainer 
	  	url={props.url}
	  	/>
	  )}/>
	  { /* Finally, catch all unmatched routes */ }
	    <Route path="/" render={() => (
	  		<HomeContainer />
	  	)}/>
  </Switch>
);