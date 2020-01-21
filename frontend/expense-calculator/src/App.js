import React from 'react';
import './assets/global.css'
import Register from './components/Register/Register';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Login from './components/Login/Login'
import Products from './components/Products/Products';


export default class App extends React.Component {
  render() {
    return (
      
      
      <Router>
        <Switch>
          <Route exact path = '/' component = {Login} />
          <Route exact path = '/register' component = {Register} />
          <Route exact path = '/products' component = {Products} />
        </Switch>
      </Router>
      
      
      
    )
  } 
}
