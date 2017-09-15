import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import './composeContainer.css'

class ComposeContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: this.props.representative ? 
			"Dear " + this.props.representative.props.representative[0] + " " + this.props.representative.props.representative[1].name + "," +
			"\nI am writing you due to the current state of disarray accross all branches of government. Please fix ASAP.\nSincerely,\nYour constituency." :
			"Dear Nobody...",
			redirect: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault()
		if (this.state.value.length < 150 || this.state.value.length>500) {
			this.refs.message.textContent = "Message must be between 150 and 500 characters";
			return
		}
		let rep = this.props.representative.props.representative
		let sender = this.props.sender

		let to = {
			name: rep[0],
			address_line1: rep[1].address[0].line1,
			address_line2: rep[1].address[0].line2,
			address_city: rep[1].address[0].city,
			address_state: rep[1].address[0].state,
			address_zip: rep[1].address[0].zip,
			address_country: 'US'
		}

		let from = {
			name: "Lob and friends",
			address_line1: sender.line1,
			address_line2: '',
			address_city: sender.city,
			address_state: sender.state,
			address_zip: sender.zip,
			address_country: 'US'
		}

		axios.post('/lob', {
		  description: "Letter to a representative",
		  to: to,
		  from: from,
		  file: 'https://s3-us-west-2.amazonaws.com/lob-assets/letter-goblue.pdf',
		  color: true,
		  file: 'tmpl_bc6bd12f6fc018c',
		  merge_variables: {
		  		message: this.state.value
		  	}
		  })
		.then(res => {
			this.props.updatePathToLetter(res.data.url)
			this.setState({
				redirect: true
			})
		})
		.catch(err => {
			console.log(err)
			this.refs.message = err
		})
	}
	render() {	
		return (
			<div className="composeContainer">
				<div ref="message">Compose your letter:</div>
				<form onSubmit={this.handleSubmit}>
					<textarea value={this.state.value} onChange={this.handleChange}>
					</textarea>
					<input type="submit" value="Lob it" />
				</form>
			

			{this.state.redirect &&
				<Redirect to='/final' />
			}
			</div>
		)
	}
}

export default ComposeContainer