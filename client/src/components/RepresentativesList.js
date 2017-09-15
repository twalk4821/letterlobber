import React, { Component } from 'react';
import RepresentativesListItem from './RepresentativesListItem'
import './RepresentativesList.css'

class RepresentativesList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeItem: null
		}
		this.setActiveItem = this.setActiveItem.bind(this)
	}

	setActiveItem(item) {

		if (this.state.activeItem) {
			this.state.activeItem.setState({
				active: false
			})
		}

		this.setState({
			activeItem: item
		})

		this.props.setActiveItem(item);
	}

	render() {
		return (
			<div className="representativesList">
				{this.props.representatives.map(representative => (
					<RepresentativesListItem representative={representative} setActiveItem={this.setActiveItem}/>		
				))}
			</div>
		)
	}
}

export default RepresentativesList