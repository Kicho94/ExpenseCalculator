import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import './ResetPass.css'


export default class ChangePass extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            newPassword: "",
            newPassword1: "",
            loading : false,
            redirect : false
        }
        
    }
saveInfo = (event) => {
    this.setState({[event.target.id] : event.target.value})
}

changePassword = () => {
    this.setState({loading : true})
    if(this.state.newPassword === this.state.newPassword1 && this.state.newPassword.length >2){
        var data = {
            newPassword :this.state.newPassword,
            confirm : this.props.match.params.id
        }
        fetch('http://127.0.0.1:8081/api/v1/reset-password',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
         }
        )
        .then((res)=>{
         if(res.status === 200){
             alert('Password successfully changed')
             this.setState({redirect:true})
         } else {
             alert('Link expired or does not exist')
             this.setState({redirect:true})
         }
        })
        .catch((err)=> {
            console.log(err)
            alert('Something went wrong')
            window.location.reload()
        })
    } else if(this.state.newPassword !== this.state.newPassword1){
        this.setState({loading:false})
        alert('Please match your new password, or make password length more than 2')
    }
    
}

render(){
    if(this.state.redirect){
        return <Redirect to='/'/>
    }
    const loading = this.state.loading
    return(

        <div className="modal-container1" id="background">
     <div className="modal1">

      <header className="modal_header1">
           <h2>Change Password</h2>
      </header>

      <section className="modal_content1">
            
            <p className="input-holder">
                <label className="field-label">New Password</label>
                <input type="password" className="text-field" id="newPassword" onChange={this.saveInfo} />
            </p>   
            <p className="input-holder">
                <label className="field-label">Confirm New Password</label>
                <input type="password" className="text-field" id="newPassword1" onChange={this.saveInfo} />
            </p>   
         
      </section>

      <section className="modal_actions1">
           <div className="modal_actions-div1">
               <Link to="/"><button className="btn-cancel1">Cancel</button></Link>
               <button className="btn-delete1" onClick={this.changePassword}>Confirm {loading && <i className="fa fa-refresh fa-spin"></i>}</button>
           </div>
     </section>

     </div>
     </div>
     )}
}