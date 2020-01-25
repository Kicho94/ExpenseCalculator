import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
class  Header extends React.Component {
  constructor(props){
    super(props)
    this.state={
      show:false
    }
    }
  render(){
        return(
      <div className="main-header">
      <div>
      <Link to='/products' style={{ color: 'inherit', textDecoration: 'inherit'}}> <button className="products-button" >PRODUCTS</button></Link>
      <Link to='/expenses' style={{ color: 'inherit', textDecoration: 'inherit'}}> <button className="expenses-button">EXPENSES</button></Link>
       </div>
      <div className="avatar">
      <img className="image" src="https://d3q94h10rclvvz.cloudfront.net/sites/default/files/mediaobjects/gal_gadot_2_sdcc_2014_cropped.jpg"/>
      <p>Gal Gadot</p>
      </div>
  </div>
    
    )
}
}

export default Header