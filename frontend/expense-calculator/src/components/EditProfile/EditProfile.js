import React from 'react';
import Header from '../Header/Header';
import '../EditProfile/EditProfile.css';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import ChangeP from '../ChangeP/changeP'

export default class EditProfile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showModal : null,
            valid : false,
            created : "",
            birth_date : "",
            first_name : "",
            last_name : "",
            email : "",
            telephone : "",
            loading: false,
            redirect:false

        }
    }
    toggleModal = () => {
        this.setState({showModal: !this.state.showModal})
    }
  
    saveProfile = (event) => {
        this.setState({[event.target.id] : event.target.value})
    }

    validate =(event) =>{
        const rules = /^([12]\d{3}-([0-9]{1,2}|1[0-2])-([0-9]{1,2}|[12]\d|3[01]))$/g;
		const valid = rules.test(event.target.value);		
		this.setState({valid , [event.target.id] : event.target.value})
    }

    validate1= () => {
        const rules = /^([12]\d{3}-([0-9]{1,2}|1[0-2])-([0-9]{1,2}|[12]\d|3[01]))$/g;
        const valid = rules.test(this.state.birth_date);
        this.setState({valid})	
    }

    componentDidMount(){
        
        fetch('http://127.0.0.1:8081/api/v1/user-info',
        {
            method : 'get',
            headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                     }
        }
        )
       .then((response) => response.json())
       .then((data) => {
          data._created = data._created.substring(0,10)
          this.setState({ created : data._created, birth_date : data.birth_date.substring(0,10), first_name : data.first_name, last_name : data.last_name, email:data.email, telephone:data.telephone})
          console.log(data)
          this.validate1()
       })
       .catch((err)=> {
           console.log(err)
       });      
    }

    updateUser = () => {
        this.setState({loading: true})
        if(!this.state.valid){
            alert('PLEASE SELECT THE DATE AS SHOWN');
            window.location.reload()
        } else {
            var data = {
                birth_date : new Date(this.state.birth_date),
                first_name : this.state.first_name,
                last_name : this.state.last_name,
                email : this.state.email,
                telephone : this.state.telephone
            }
            fetch('http://127.0.0.1:8081/api/v1/update-user', 
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify(data)    
            })
            .then((response)=> {
                if(response.status == 200){
                    alert('User successfully updated')
                    localStorage.clear()
                    this.setState({redirect:true})
                }
            })
            .catch((err)=>{
                console.log(err)
                alert('Something went wrong')
            })
        }
    }
    
    render(){
        if(this.state.redirect){
            return <Redirect to= '/'/>
        }
        const loading = this.state.loading
        var modal = null
        if(this.state.showModal){
            modal = <ChangeP toggle={this.toggleModal}/>
        }
        return (
            <React.Fragment>
            <Header/>
            {modal}
            <div className="newproduct-header">
                <h1>Edit Profile</h1>                                 
            </div>

<div className="newproduct-box">
         <div className="main-box">
        
            <p className="input-holder">
                <label className="field-label" >First Name</label>
                <input type="text" className="text-field" id="first_name" defaultValue={this.state.first_name} onChange={this.saveProfile}/>
            </p> 

            <p className="input-holder">
				<label className="field-label">Last Name</label>
				<input type="text" className="text-field" id="last_name" defaultValue={this.state.last_name} onChange={this.saveProfile}/>
		    </p> 

            <p className="input-holder">
                <label className="field-label">E-Mail</label>
                <input type="text" className="text-field" id="email" defaultValue={this.state.email} onChange={this.saveProfile}/>
			</p> 

			
		    <p className="input-holder">
			    <label className="field-label">Birth Date</label>
			    <input type="text" className="text-field" id="birth_date" defaultValue={this.state.birth_date} onChange={this.validate}/>
		    </p> 

		    <p className="input-holder">
		    	<label className="field-label">Telephone</label>
			    <input type="number" className="text-field" min="0" id="telephone" defaultValue={this.state.telephone} onChange={this.saveProfile}/>
		     </p > 

             <p className="input-holder">
        <label className="field-label">Created  {this.state.created}</label>    
		     </p >
	    <button className="main-button register-button" onClick={this.updateUser}>{loading && <i className="fa fa-refresh fa-spin"></i>}COMPLETE</button>
             
    </div>

        <div className="p-box">   
         <div className="plus-icon">         
            <button className="changepassword" onClick={this.toggleModal}><i class="fas fa-plus-circle"></i></button>
            <p>Change Password</p>
            </div>
        </div>

</div>
            </React.Fragment>
        )
    }
}