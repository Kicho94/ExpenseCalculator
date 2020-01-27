import React from 'react'
import './register.css'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
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
			}
	this.saveUser = this.saveUser.bind(this)
	this.registerUser = this.registerUser.bind(this);
		}

		
	saveUser = (event) => {
		this.setState({[event.target.id] : event.target.value})
	}

	registerUser = (event) => {
		if(this.state.first_name.length < 0 ||
			this.state.last_name.length < 0 ||
			this.state.email.length < 0 ||
			this.state.birth_date.length < 0 ||
			this.state.telephone === null  ||
			this.state.country.length < 0 ||
			this.state.password.length < 0
			) {
			alert('PLEASE FILL OUT ALL OF THE FIELDS')
		}
	     else if(this.state.email.indexOf('@') <= 0){
			alert("Please enter a valid email")
		}
		else if(this.state.password.length < 3){ 
			alert("Password must be at least 3 characters")
		}
		 else if(this.state.first_name.length > 0 &&
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
			birth_date : this.state.birth_date,
			telephone : this.state.telephone,
			country : this.state.country,
			password : this.state.password,
			_created: new Date()
			
		}
		event.preventDefault();
		

		fetch('http://127.0.0.1:8081/api/v1/register', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then((response) => response.json())
.then((data) => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
})

}

	 
	}
	
    render(){

        return(
			<React.Fragment>  
		   <div id="register-container">
    <div className="main-box">
        <form>
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
			<input type="text" className="text-field" id="birth_date" onChange={this.saveUser}/>
		 </p> 
		 <p className="input-holder">
			<label className="field-label" >Telephone</label>
			<input type="number" className="text-field" id="telephone" onChange={this.saveUser}/>
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
        </form>
       
    </div>
	
</div>
<div className="onboarding-description">
           <p>Or if u already have an account, <Link to='/' style={{textDecoration: 'none'}}><a href="#" className="onboarding-description">Sign in</a>.</Link></p>
       </div>
</React.Fragment>
        )
        
    }
}