import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class FinalContainer extends Component {
	render() {
		return (
			<div className="finalContainer">
				<h3>Congrats! Your letter can be downloaded at:</h3>
				<div>{this.props.url}</div>
				<Link to="/">Write another!</Link>
			</div>
		)
	}
}

export default FinalContainer