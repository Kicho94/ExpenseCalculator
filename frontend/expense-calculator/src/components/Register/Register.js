import React from 'react'
import './register.css'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

export default class Register extends React.Component {
	
    render(){
        return(
			<React.Fragment>  
		   <div id="register-container">
    <div className="main-box">
        <form>
            <p className="input-holder">
             <label className="field-label">First Name</label>
             <input type="text" className="text-field"/>
            </p>   
            <p className="input-holder">
                 <label className="field-label">Last Name</label>
                 <input type="text" className="text-field"/>
			</p> 
			<p className="input-holder">
				<label className="field-label">E-mail</label>
				<input type="text" className="text-field"/>
		   </p> 
		   <p className="input-holder">
			<label className="field-label">Date of Birth</label>
			<input type="text" className="text-field"/>
		 </p> 
		 <p className="input-holder">
			<label className="field-label">Telephone</label>
			<input type="text" className="text-field"/>
		 </p> 
		 <p className="input-holder">
			<label className="field-label">Country</label>
			<input type="text" className="text-field"/>
		 </p> 
		 <p className="input-holder">
			<label className="field-label">Password</label>
			<input type="text" cla	ssName="text-field"/>
	   </p> 
	  <Link to='/products'><button className="main-button register-button">REGISTER</button></Link>
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