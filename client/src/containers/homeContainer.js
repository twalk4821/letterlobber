import React, { Component } from 'react';
import RepresentativesList from '../components/RepresentativesList.js';
import './homeContainer.css'

class HomeContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			address: "",
			message: "",
			representatives: [],

		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		//validation
		this.setState({
			address: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		let address = this.validateInput(this.state.address);
		if (!address) {
			this.refs.intro.textContent = "Please enter a valid address."
			return;
		}
		let url = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCif9f6okRiV9Qh0ebQ_t35MasXFOAU9kM&address=" + address;
		fetch(url)
		.then(res => res.json())
		.then(result => {
			console.log(result)
			this.processResult(result);
		})
		.catch(err=> {
			this.refs.intro.textContent = "Something went wrong parsing that location. Please try again."
			console.log(err)
		})
	}

	validateInput(text) {
		text = text.split(" ");
		//only allow addresses!!
		if (typeof parseInt(text[0]) !== "number" ) {
			return false
		}
		let address = "";
		for (let word of text) {
			address += (word + "%20")
		}
		return address.slice(0, address.length-3);
	}
	processResult(result) {
		let offices = result.offices;
		let officials = result.officials
		const representatives = [];
		const sender = result.normalizedInput
		offices.forEach(office => {
			office.officialIndices.forEach(officialIndex => {
				representatives.push([office.name, officials[officialIndex]])
			})
		})
		this.setState({
			representatives: representatives
		})
		this.props.setSender(sender)
		this.refs.intro.textContent = "Great. Now select a representative from the list to start crafting your eloquent message."
	}

	render() {
		return (
			<div className="homeContainer">
				<h3 ref="intro" className="App-intro">
          		Direct action has never been Easier. </h3>
          		<p>
          		Start by entering your address to see
          		who your representatives are.
          		</p>
				<form className="homeForm" onSubmit={this.handleSubmit}>
					<input value={this.state.address} onChange={this.handleChange}/>
					<input type="submit" value="See Representatives" />
				</form>
				<RepresentativesList representatives={this.state.representatives} setActiveItem={this.props.setActiveItem}/>
			</div>
		)
	}
}

export default HomeContainer;