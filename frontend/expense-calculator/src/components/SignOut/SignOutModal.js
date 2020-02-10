import React from 'react'
import './SignOutModal.css'
import {BrowserRouter as Router, Redirect, Link, Switch} from 'react-router-dom';



export default class SignOutModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            redirect : false,
        }
      
   }  
   logout = () => {
    localStorage.clear();
    this.setState({redirect : true})
  }
       render(){
        if(this.state.redirect){
            return  <Redirect to="/" />
}
  return (
    <div className="modal-containeras">
     <div className="modala">

     
      <section className="modal_contenta">
          <h2>Are u sure u want to sign out?</h2>
      </section>

      <section className="modal_actionsa">
           <div className="modal_actionsa-div">
               <button onClick={this.props.closeModal} className="btn-cancel">Cancel</button>
               <button className="btn-delete" onClick={this.logout}>SignOut</button>
           </div>
     </section>

     </div>
     </div>
  )
}
}