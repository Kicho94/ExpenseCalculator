import React from 'react'
import './register.css'
import {BrowserRouter as  Route, Link, Switch, Redirect} from 'react-router-dom'
import axios from 'axios'

export default class Register extends React.Component {
	constructor(){
		super()
		this.state= {	
			first_name : "",
			last_name : "",
			email : "",
			birth_date : "",
			telephone : null,
			country : "",
			password : "",
			redirect : false,
			valid : false
		};
		this.saveUser = this.saveUser.bind(this)
		this.registerUser = this.registerUser.bind(this);
	}

	

	saveUser = (event) => {
		this.setState({[event.target.id] : event.target.value})
	}

	
	validate =(event) =>{
		const rules = /^([0-9]){4}-([0-9]){1,2}-([0-9]){1,2}$/g;
		const valid = rules.test(event.target.value);
		this.setState({valid, [event.target.id] : event.target.value})
	}
	registerUser = (event) =>{
		if(this.state.first_name.length < 0 ||
			this.state.last_name.length < 0 ||
			this.state.email.length < 0 ||
			this.state.birth_date.length < 0 ||
			this.state.telephone === null  ||
			this.state.country.length < 0 ||
			this.state.password.length < 0
		) {
			alert('PLEASE FILL OUT ALL OF THE FIELDS');
		} else if(this.state.email.indexOf('@') <= 0){
			alert("Please enter a valid email");
		} else if (this.state.password.length < 3) { 
			alert("Password must be at least 3 characters");
		} else if(!this.state.valid){
			alert("Please create the date as shown")
			window.location.reload()
		}
		else if (this.state.first_name.length > 0 &&
			this.state.last_name.length > 0 &&
			this.state.email.length > 0 &&
			this.state.birth_date.length > 0 &&
			this.state.telephone.length > 0 &&
			this.state.country.length > 0 &&
			this.state.password.length > 3
		){	
			const data = {
				first_name : this.state.first_name,
				last_name : this.state.last_name,
				email : this.state.email,
				birth_date : new Date(this.state.birth_date),
				telephone : this.state.telephone,
				country : this.state.country,
				password : this.state.password,
				_created: new Date()
			};

			axios.post('http://127.0.0.1:8081/api/v1/register',data)
			.then((data) => {
				console.log('Success:', data);
				this.setState({redirect : true})
				alert('User successfuly created!')
			})
			.catch((error) => {
				console.log(data)
				alert('something went wrong')
				window.location.reload();
				console.error('Error:', error);
		}) 
		}
	}
	

    render(){
		if(this.state.redirect){
			return <Redirect to="/" />
		}
		
        return (
			<>  
				<div id="register-container">
					<div className="main-box">
						<p className="input-holder">
							<label className="field-label">First Name</label>
							<input type="text" className="text-field" id="first_name" onChange={this.saveUser}/>
						</p>   
						<p className="input-holder">
							<label className="field-label" >Last Name</label>
							<input type="text" className="text-field" id="last_name" onChange={this.saveUser}/>
						</p> 
						<p className="input-holder">
							<label className="field-label">E-mail</label>
							<input type="text" className="text-field"  id="email" onChange={this.saveUser}/>
						</p> 
						<p className="input-holder">
							<label className="field-label" >Date of Birth</label>
							<input type="text" className="text-field" id="birth_date" onChange={this.validate} placeholder="Year-Month-Day"/>
						</p> 
						<p className="input-holder">
							<label className="field-label" >Telephone</label>
							<input type="text" className="text-field" id="telephone" onChange={this.saveUser}/>
						</p> 
						<p className="input-holder">
							<label className="field-label" >Country</label>
							<input type="text" className="text-field" id="country" onChange={this.saveUser}/>
						</p> 
						<p className="input-holder">
							<label className="field-label" >Password</label>
							<input type="password" className="text-field" id="password" onChange={this.saveUser}/>
						</p> 
						<button className="main-button register-button" onClick={this.registerUser}>REGISTER</button>
					</div>
				</div>
				<div className="onboarding-description">
					<p>Or if u already have an account, <Link to='/' style={{ textDecoration: 'underline #8D8D8D', }}><a href="#" className="onboarding-description">Sign in</a>.</Link></p>
				</div>
			</>
        );
    }
}