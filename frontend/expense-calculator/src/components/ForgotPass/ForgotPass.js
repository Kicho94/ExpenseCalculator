import React from 'react'
import {BrowserRouter as  Route, Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import './ForgotPass.css'

export default class ForgotPass extends React.Component {
    constructor(){
        super()
        this.state = {
            email : '',
            loading:false,
            redirect : false
        }
    }
    saveInfo = (event) => {
        this.setState({[event.target.id] : event.target.value})
    }

    sendEmail = () => {
        this.setState({loading:true})
      var data = { email : this.state.email} ;
      fetch(
        'http://127.0.0.1:8081/api/v1/reset-link', 
    {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
     }
    ) 
.then((res)=>{
if(res.status === 200){
    alert('Reset link successfully sent')
  this.setState({redirect:true})

} else {
    alert('Email does not exist')
    window.location.reload()

}
})
.catch(err =>{
   console.log(err)
   alert('Something went wrong')
   window.location.reload()

})
    }

    render(){
        if(this.state.redirect){
            return <Redirect to='/'/>
        }
        if(localStorage.getItem('jwt')){
            return <Redirect to="/products" />
        }
        const loading = this.state.loading
        return(
            <div id="login-container">
            <div className="main-box">
                    <p className="input-holder">
                         <label className="field-label" id = "fieldlabel">Please enter your e-mail adress</label>
                         <input type="text" className="text-field email" id="email" onChange={this.saveInfo} />
                         </p>   
                         <button className="main-button login-button" onClick={this.sendEmail}>{loading && <i className="fa fa-refresh fa-spin"></i>} Send reset-password link</button> 
               <div className="onboarding-description">
                   <p><Link to='/' style={{ textDecoration: 'underline #8D8D8D', }}><span className="onboarding-description">CANCEL</span></Link></p>
               </div>
            </div>
        
        </div>
        )
    }
}