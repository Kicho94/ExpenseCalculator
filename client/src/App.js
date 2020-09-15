import React, { useDebugValue } from 'react';
import './assets/global.css'
import Register from './components/Register/Register';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login/Login'
import Products from './components/Products/Products';
import Expenses from './components/Expenses/Expenses';
import NewProduct from './components/NewProduct/NewProduct';
import EditProduct from './components/EditProduct/EditProduct'
import EditProfile from './components/EditProfile/EditProfile';
import ForgotPass from './components/ForgotPass/ForgotPass'
import ResetPass from './components/ResetPass/ResetPass'
  
export default class App extends React.Component {
  
  render() {
   console.log(localStorage.getItem('jwt')) 
    return (
      
      
      <Router>
        <Switch>
          
          <Route exact path = '/' component = {Login} />
          <Route exact path = '/register' component = {Register} />
          <Route exact path = '/forgot-password' component = {ForgotPass} />
          <Route exact path = '/reset-password/:id' component = {ResetPass}/>
          {!localStorage.getItem('jwt') && <Redirect exact to='/' />}
          <Route exact path = '/products' component = {Products}/>
          <Route exact path = '/expenses' component ={Expenses} />
          <Route exact path = '/newproduct' component = {NewProduct}/>
          <Route path = '/editproduct/:id'  component ={EditProduct}/>
          <Route path = '/editprofile/' component ={EditProfile}/>
          </Switch>
      </Router>
      
      
      
    )
  } 
}
