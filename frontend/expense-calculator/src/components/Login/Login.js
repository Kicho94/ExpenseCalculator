import React from 'react'
import './login.css'
import {BrowserRouter as  Route, Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'


export default class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            email : "",
            password : "",
            loading : false
           
        }
    }

        saveUser = (event) => {
            this.setState({[event.target.id] : event.target.value})
        }

        login = (e) =>{
            this.setState({loading: true})
            var data = {
                email : this.state.email,
                password : this.state.password,
                
             };
             
                fetch(
                    'http://127.0.0.1:8081/api/v1/login', 
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                 }
                ) 
            .then(res => res.json())
            .then(d=>{
                localStorage.setItem('jwt', d.jwt);
                localStorage.setItem('fullname', d.fullname);
                window.location.reload()                
            })
            .catch(err =>{
                console.log(err);
                alert('Your username or password is incorrect');
                window.location.reload()
            })
        }   
        
    render(){
         if(localStorage.getItem('jwt')){
                return <Redirect to="/products" />
            }
            const loading = this.state.loading
        return(
            <div id="login-container">
    <div className="main-box">
        
            <p className="input-holder">
             <label className="field-label">E-mail</label>
             <input type="text" className="text-field" id="email" onChange={this.saveUser} onKeyDown={ (event) => {if(event.key === 'Enter'){this.login()}}}/>
            </p>   
            <p className="input-holder">
                 <label className="field-label">Password</label>
                 <input type="password" className="text-field" id="password" onChange={this.saveUser} onKeyDown={ (event) => {if(event.key === 'Enter'){this.login()}}}/>
                 </p>   
                 <button className="main-button login-button" onClick={this.login}>{loading && <i className="fa fa-refresh fa-spin"></i>} SIGN IN</button> 
       <div className="onboarding-description">
           <p>If u don't have an account, <Link to='/register' style={{ textDecoration: 'underline #8D8D8D', }}><span className="onboarding-description">Register.</span></Link></p>
           <p>Or if u forgot your password, <Link to='/forgot-password' style={{ textDecoration: 'underline #8D8D8D', }}><span className="onboarding-description">Click here.</span></Link></p>
       </div>
    </div>

</div>
        )
    }
}   