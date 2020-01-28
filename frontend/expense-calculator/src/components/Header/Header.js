import React from 'react';
import {BrowserRouter as Router, Redirect, Link, Switch} from 'react-router-dom'
import './Header.css'


class  Header extends React.Component {
  constructor(props){
    super(props)
    this.state={
      show:false,
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
        return(
      <div className="main-header">
      <div>
      <Link to='/products' style={{ color: 'inherit', textDecoration: 'inherit'}}> <button className="products-button" >PRODUCTS</button></Link>
      <Link to='/expenses' style={{ color: 'inherit', textDecoration: 'inherit'}}> <button className="expenses-button">EXPENSES</button></Link>
       </div>
      <div className="avatar">
      <div className="signout"><button onClick={this.logout}>Sign Out</button></div>
      <img className="image" src="https://d3q94h10rclvvz.cloudfront.net/sites/default/files/mediaobjects/gal_gadot_2_sdcc_2014_cropped.jpg"/>
      <p>Gal Gadot</p>
      </div>
  </div>
    
    )
}
}

export default Header