import React from 'react';
import Header from '../Header/Header'
import '../NewProduct/NewProduct.css'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

export default class NewProduct extends React.Component {
    render (){
        return (
            <React.Fragment>
            <Header/>
            <div className="newproduct-header">
                <h1>New Product</h1>                                 
            </div>
            <div className="newproduct-box">
            <div className="main-box">
        <form>
            <p className="input-holder">
             <label className="field-label">Product Name</label>
             <input type="text" className="text-field"/>
            </p>   
            <p className="input-holder">
                 <label className="field-label">Product Description</label>
                 <input type="text" className="text-field"/>
			</p> 
			<p className="input-holder">
				<label className="field-label">Product Type</label>
				<input type="text" className="text-field"/>
		   </p> 
		   <p className="input-holder">
			<label className="field-label">Purchase Date</label>
			<input type="text" className="text-field"/>
		 </p> 
		 <p className="input-holder">
			<label className="field-label">Product Price</label>
			<input type="text" className="text-field"/>
		 </p> 		 
	   <Link to='/products'><button className="main-button register-button">REGISTER</button></Link>
        </form>       
    </div>
    <div className="p-box">   
        <div className="plus-icon">         
        <i class="fas fa-plus-circle"></i>        
        <p>You are creating a new product</p>
        </div>
                    
        
        
        

    </div>
    </div>
            </React.Fragment>
        )
    }
}
