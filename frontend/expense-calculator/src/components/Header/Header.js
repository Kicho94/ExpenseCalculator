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
       <button className="products-button" ><Link to='/products' style={{ color: 'inherit', textDecoration: 'inherit'}}>PRODUCTS</Link></button>
       <button className="expenses-button"><Link to='/expenses' style={{ color: 'inherit', textDecoration: 'inherit'}}>EXPENSES</Link></button>
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