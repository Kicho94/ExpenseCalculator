import React from 'react'
import Header from '../Header/Header'
import TableP from '../Tables/TableP'
import './products.css'
import {Link} from 'react-router-dom'
import DeleteModal from '../Tables/DeleteModal'


export default class Products extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : "purchase_date:-1",
            data : {},
            show: null,
            id : undefined
        }       
        var style = {height:"100%", width : "100%",}
    
    }
                             
           
      
    
    changeV = (event) => {
         this.setState(
            {
                 value : [event.target.value]
            }, 
                this.getData);         
            
            }
    
    getData = () => {
        fetch(`http://127.0.0.1:8080/api/v1/products?sort=${this.state.value}`,
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
            this.setState({ data : data})
            
        })
        .catch((err)=> {
            console.log(err)
        });
        
     }
     deleteProduct = () => {
     
        fetch(
         `http://127.0.0.1:8080/api/v1/products/${this.state.id}`, 
     {
         method: 'delete',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                 }
     }
     ) 
    .then((response) => {
        console.log(response)
        alert('Product successfully deleted!')
        window.location.reload();
     })
    .catch((err)=> {
       console.log(err)
       alert('Something went wrong!')
   });
      }

     cancel = () => {
         this.setState({ show : null})
     }
    
     getId = (id) => {
        this.setState({id : id})
     }

     showModal = () => {
         this.setState({ show :  <DeleteModal  cancel = {this.cancel} deleteProduct={this.deleteProduct}/>})
     }
     
    componentDidMount(){
        this.getData()
    }
    
    
   
    render() {
            return (
<React.Fragment> 
    <div id="products-container"  >
        
        <Header />
            <div id="products-background">
                <div className="products-header">            
                    <div>
                        <h1>Products</h1>
                    </div>
                        <div className="filter">                     
                            <p>Filter by: </p>
                                <select value={this.state.value} onChange={this.changeV}>
                                    <option value="purchase_date:-1">Latest Purchase</option>
                                    <option value="product_price:-1">Highest Price</option>
                                    <option value="product_price:1">Lowest Price</option>
                                    <option value="purchase_date:1">Oldest Purchases</option>
                                </select>  
                        </div> 
                </div>   
            
                                <TableP data={this.state.data} showModal = {this.showModal} getId={this.getId} style1={this.state.show}/>
            </div>
                    <div className="newp-button">
                        <Link to="/newproduct"><button>NEW PRODUCT</button></Link>
                    </div>
                
                    {this.state.show}
    </div>        
                             
   
</React.Fragment>
        )
    }
}



