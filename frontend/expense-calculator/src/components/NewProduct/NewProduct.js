    import React from 'react';
import Header from '../Header/Header'
import '../NewProduct/NewProduct.css'
import {BrowserRouter as  Link, Redirect} from 'react-router-dom'

export default class NewProduct extends React.Component {
    constructor(){
        super();
        this.state = {
            product_name: '',
            product_desc: '',
            product_type: '',
            purchase_date: undefined,
            product_price: undefined,
            redirect : false,
            valid : false,
            quantity: "1"
           
        }
    }
    

    saveProduct = (event) => {
        this.setState({[event.target.id] : event.target.value})
    }

    validate =(event) =>{
		const rules = /^([0-9]){4}-([0-9]){1,2}-([0-9]){1,2}$/g;
		const valid = rules.test(event.target.value);
		this.setState({valid, [event.target.id] : event.target.value})
	}

    createProduct = () => {
        if(!this.state.valid){
            alert('PLEASE SELECT THE DATE AS SHOWN')
            window.location.reload()
        } else {
            for(let i = 1; i <= this.state.quantity; i++){
                
               
        const data = {
            product_name: this.state.product_name,
            product_desc: this.state.product_desc,
            product_type: this.state.product_type,
            purchase_date: new Date(this.state.purchase_date),
            product_price: Number(this.state.product_price),
            _created: new Date()
        }
        fetch(
            'http://127.0.0.1:8080/api/v1/products', 
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(data)
         }
        ) 
        .then((data)=> {
        console.log(data);
        if(data.status === 201){
        alert('Product successfully added');
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
     }
    changeV = (event)=>{
        this.setState({quantity : event.target.value})
    }

    render (){
        if (this.state.redirect){
            return <Redirect to = "/products" />
        }

        return (
            <React.Fragment>
            <Header/>
            <div className="newproduct-header">
                <h1>New Product</h1>                                 
            </div>

<div className="newproduct-box">
         <div className="main-box">
        
            <p className="input-holder">
             <label className="field-label">Product Name</label>
             <input type="text" className="text-field" id="product_name" onChange={this.saveProduct}/>
            </p> 

            <p className="input-holder">
				<label className="field-label">Product Type</label>
				<input type="text" className="text-field" id="product_type" onChange={this.saveProduct}/>
		    </p> 


            <p className="input-holder">
                 <label className="field-label">Product Description</label>
                 <input type="text" className="text-field" id="product_desc" onChange={this.saveProduct}/>
			</p> 

			
		    <p className="input-holder">
			<label className="field-label">Purchase Date</label>
			<input type="text" className="text-field" id="purchase_date" onChange={this.validate} placeholder="Year-Month-Day"/>
		    </p> 

		 <p className="input-holder">
			<label className="field-label">Product Price</label>
			<input type="number" className="text-field" min="0" id="product_price" onChange={this.saveProduct}/>
		 </p> 
         <select onChange={this.changeV}>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
             <option value="7">7</option>
             <option value="8">8</option>
             <option value="9">9</option>
             <option value="10">10</option>
         </select>

	    <button className="main-button register-button" onClick={this.createProduct}>CREATE NEW PRODUCT</button>
             
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
