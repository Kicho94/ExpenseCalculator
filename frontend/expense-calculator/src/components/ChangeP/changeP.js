import React from 'react'
import { Redirect } from 'react-router-dom'
import './changeP.css'


export default class ChangeP extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            password: "",
            newPassword: "",
            newPassword1: ""
        }
        
    }
saveInfo = (event) => {
    this.setState({[event.target.id] : event.target.value})
}

changePassword = () => {
    if(this.state.newPassword === this.state.newPassword1){
        var data = {
            password: this.state.password,
            newPassword :this.state.newPassword
        }
        fetch('http://127.0.0.1:8081/api/v1/change-password',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(data)
         }
        )
        .then((res)=>{
            if(res.status ===200){
                alert('Password successfully changed')
                localStorage.clear();
                window.location.reload()
            }
        })
        .catch((err)=> {
            console.log(err)
            alert('Something went wrong')
        })
    } else if(this.state.newPassword !== this.state.newPassword1){
        alert('Please match your new password')
    }
    
}

render(){
    return(

        <div className="modal-container1">
     <div className="modal1">

      <header className="modal_header1">
           <h2>Change Password</h2>
      </header>

      <section className="modal_content1">
            <p className="input-holder">
                <label className="field-label">Current Password</label>
                <input type="password" className="text-field" id="password" onChange={this.saveInfo} />
            </p>   
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
               <button onClick={this.props.toggle} className="btn-cancel1">Cancel</button>
               <button className="btn-delete1" onClick={this.changePassword}>Confirm</button>
           </div>
     </section>

     </div>
     </div>
     )}
}