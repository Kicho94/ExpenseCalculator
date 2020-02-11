import React from 'react';
import {BrowserRouter as Router, Redirect, Link, Switch} from 'react-router-dom';
import './Header.css';
import SelectBox from '../select-box/selectbox'
import SignOutModal from '../SignOut/SignOutModal'
class  Header extends React.Component {
  constructor(props){
    super(props)
    this.state={
      show:false,
      redirect : false,
      showItems: false,
      showModal : null
    }
    }
  openModal = () => {
    this.setState({showModal : <SignOutModal closeModal={this.closeModal}/>})
  }
  closeModal = ()=>{
    this.setState({showModal: null})
  }
  handleBlur = () => {
    setTimeout(() => {
      this.setState({showItems : false})
    },150)
  }

  render(){
    
        return(
          <React.Fragment>
  {this.state.showModal}
          
      <div className="main-header">
      <div>
      <Link to='/products' style={{ color: 'inherit', textDecoration: 'inherit'}}> <button className="products-button" >PRODUCTS</button></Link>
      <Link to='/expenses' style={{ color: 'inherit', textDecoration: 'inherit'}}> <button className="expenses-button">EXPENSES</button></Link>
       </div>
      <div className="avatar">  
        <div className="menu-icon">
            <button className="account-button" onClick={()=>{this.setState({showItems: !this.state.showItems})}} onBlur={this.handleBlur}  >
              <img className="image" src="data:image/png;base64,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"/>
            </button>
        </div>    
          <SelectBox showItems={this.state.showItems} openModal={this.openModal}/>
        <div className="header-name"> <p>{localStorage.getItem('fullname')}</p></div>
      </div>
  </div>
  </React.Fragment>
    )
}
}

export default Header