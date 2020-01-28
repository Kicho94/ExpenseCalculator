import React from 'react'
import './login.css'
import {BrowserRouter as  Route, Link, Switch} from 'react-router-dom'
import { Redirect } from 'react-router-dom'


export default class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            email : "",
            password : "",
            redirect : false
        }
    }

        saveUser = (event) => {
            this.setState({[event.target.id] : event.target.value})
        }

        login = () =>{
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
                this.setState({redirect : true})
                
            })
            .catch(err =>{
                console.log(err)
                alert('Your username or password is incorrect')
            })
        }
  
    render(){
        if(this.state.redirect){
            return <Redirect to="/products" />
        }
        
        return(
            <div id="login-container">
    <div className="main-box">
        
            <p className="input-holder">
             <label className="field-label">E-mail</label>
             <input type="text" className="text-field" id="email" onChange={this.saveUser}/>
            </p>   
            <p className="input-holder">
                 <label className="field-label">Password</label>
                 <input type="password" className="text-field" id="password" onChange={this.saveUser}/>
            </p> 
            
            <button className="main-button login-button" onClick={this.login}>SIGN IN</button>
        
       <div className="onboarding-description">
           <p>Or if u don't have an account, <Link to='/register' style={{textDecoration: 'none'}}><span>Register.</span></Link></p>
       </div>
    </div>

</div>
        )
    }
}