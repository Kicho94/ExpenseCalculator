import React from 'react';
import Header from '../Header/Header';
import '../EditProduct/EditProduct.css';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

export default class EditProduct extends React.Component {
    constructor(){
        super();
        this.state = {
            product_name: '',
            product_desc: '',
            product_type: '',
            purchase_date: undefined,
            product_price: undefined,
            redirect : false,
            data : {},
            valid : false
        }
    }

    saveProduct = (event) => {
        this.setState({[event.target.id] : event.target.value})
    }

    validate =(event) =>{
        const rules = /^([12]\d{3}-([0-9]{1,2}|1[0-2])-([0-9]{1,2}|[12]\d|3[01]))$/g;
		const valid = rules.test(event.target.value);		
		this.setState({valid , [event.target.id] : event.target.value})
    }
    validate1= () => {
        const rules = /^([12]\d{3}-([0-9]{1,2}|1[0-2])-([0-9]{1,2}|[12]\d|3[01]))$/g;
        const valid = rules.test(this.state.purchase_date);
        this.setState({valid})	
    }
    
    componentDidMount(){
        
        const id = this.props.match.params.id
        fetch(`http://127.0.0.1:8080/api/v1/products/${id}`,
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
           console.log(data)
           data.purchase_date = new Date(data.purchase_date).toISOString().substring(0, 10)
           this.setState({ data : data, product_name: data.product_name, product_desc : data.product_desc, product_type : data.product_type, purchase_date: data.purchase_date, product_price : data.product_price})
           this.validate1()
       })
       .catch((err)=> {
           console.log(err)
       });
      
    }


    createProduct = () => {
            if(!this.state.valid){
                alert('PLEASE SELECT THE DATE AS SHOWN');
                window.location.reload()
            } else {
        
        const data = {
            product_name: this.state.product_name,
            product_desc: this.state.product_desc,
            product_type: this.state.product_type,
            purchase_date: new Date(this.state.purchase_date),
            product_price: Number(this.state.product_price),
            _created: new Date()
        }
        const id = this.props.match.params.id
        fetch(
           ' http://127.0.0.1:8080/api/v1/products/' + id, 
           {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(data)
         }
        ) 
        .then((data)=> {
        console.log(data);
        if(data.status === 204){
        alert('Product successfully updated');
        this.setState({redirect : true})
    }   
        }
        )
        .catch(err =>{
        console.log(err)
        alert('Something went wrong')
        })
    }
        }

    render (){
        if (this.state.redirect){
            return <Redirect to = "/products"/>
        }

        return (
            <React.Fragment>
            <Header/>
            <div className="newproduct-header">
                <h1>Edit Product</h1>                                 
            </div>

<div className="newproduct-box">
         <div className="main-box">
        
            <p className="input-holder">
                <label className="field-label" >Product Name</label>
                <input type="text" className="text-field" id="product_name" onChange={this.saveProduct} placeholder={this.state.data.product_name}/>
            </p> 

            <p className="input-holder">
				<label className="field-label">Product Type</label>
				<input type="text" className="text-field" id="product_type" onChange={this.saveProduct} placeholder={this.state.data.product_type}/>
		    </p> 

            <p className="input-holder">
                <label className="field-label">Product Description</label>
                <input type="text" className="text-field" id="product_desc" onChange={this.saveProduct} placeholder={this.state.data.product_desc}/>
			</p> 

			
		    <p className="input-holder">
			    <label className="field-label">Purchase Date</label>
			    <input type="text" className="text-field" id="purchase_date" onChange={this.validate} placeholder={this.state.data.purchase_date} />
		    </p> 

		    <p className="input-holder">
		    	<label className="field-label">Product Price</label>
			    <input type="number" className="text-field" min="0" id="product_price" onChange={this.saveProduct} placeholder={this.state.data.product_price}/>
		     </p > 

	    <button className="main-button register-button" onClick={this.createProduct}>COMPLETE</button>
             
    </div>

        <div className="p-box">   
         <div className="plus-icon">         
            <i class="fas fa-plus-circle"></i>        
            <p>You are editing this product</p>
            </div>
        </div>

</div>
            </React.Fragment>
        )
    }
}
