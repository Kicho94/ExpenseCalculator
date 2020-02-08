import React, { useDebugValue } from 'react';
import './assets/global.css'
import Register from './components/Register/Register';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login/Login'
import Products from './components/Products/Products';
import Expenses from './components/Expenses/Expenses';
import NewProduct from './components/NewProduct/NewProduct';
import EditProduct from './components/EditProduct/EditProduct'


export default class App extends React.Component {

  render() {
   
    return (
      
      
      <Router>
        <Switch>
          
          <Route exact path = '/' component = {Login} />
          <Route exact path = '/register' component = {Register} />
          {localStorage.getItem('jwt') ?  undefined : <Redirect to="/"/> }
          <Route exact path = '/products' component = {Products}/>
          <Route exact path = '/expenses' component ={Expenses} />
          <Route exact path = '/newproduct' component = {NewProduct}/>
          <Route path = '/editproduct/:id'  component ={EditProduct}/>
          </Switch>
      </Router>
      
      
      
    )
  } 
}
