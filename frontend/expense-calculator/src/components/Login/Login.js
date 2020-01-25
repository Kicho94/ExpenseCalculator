import React from 'react'
import './login.css'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'


export default class Login extends React.Component {
    render(){
        return(
            <div id="login-container">
    <div className="main-box">
        <form >
            <p className="input-holder">
             <label className="field-label">E-mail</label>
             <input type="text" className="text-field"/>
            </p>   
            <p className="input-holder">
                 <label className="field-label">Password</label>
                 <input type="text" className="text-field"/>
            </p> 
            
            <Link to='/products'><button className="main-button login-button">SIGN IN</button></Link> 
        </form>
       <div className="onboarding-description">
           <p>Or if u don't have an account, <Link to='/register' style={{textDecoration: 'none'}}><span>Register.</span></Link></p>
       </div>
    </div>

</div>
        )
    }
}