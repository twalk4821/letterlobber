import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RepresentativesListItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			active: false
		}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		this.setState({
			active: true
		})
		this.props.setActiveItem(this)

	}

	render() {
		let classes = this.state.active ? "representativesListItem active" : "representativesListItem";

		return (
			<li className={classes} onClick={this.handleClick}>
				<div>{this.props.representative[0]}</div>
				<div>{this.props.representative[1].name}</div>
				{this.state.active &&
					<Link to="/compose">
						<button>Write this representative</button>
					</Link>	
				}
				
			</li>
		)
	}
}

export default RepresentativesListItem