import React from 'react'
import  './styles.css'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'


export default class SelectBox extends React.Component {
    constructor(props){
        super(props)
        this.state = {
              items: this.props.items || [],
              showItems : false,
             
              
        }
    }
    render(){
        
        return(
            <React.Fragment>

            <div className="select-box" style={{display: this.props.showItems ? 'block' : 'none'}}>
                 <Link to="/editprofile"><button>Account</button></Link>
                 <button onClick={this.props.openModal}>Sign Out!</button>
                 
            </div>
            
            </React.Fragment>
        )
    }
}