import React from 'react'
import Header from '../Header/Header'
import TableP from '../Tables/TableP'
import './products.css'
import {Link} from 'react-router-dom'



export default class Products extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : "purchase_date:-1",
            data : {}
        }       
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
            
        });
        
     }
     
    componentDidMount(){
        this.getData()
    }
    
    
   
    render() {
            return (<React.Fragment> 
                <div id="products-container">
             <Header />
            <div id="products-background">
            <div className="products-header">            
                 <div><h1>Products</h1></div>
                 <div className="filter">                     
                  <p>Filter by: </p>
                <select value={this.state.value} onChange={this.changeV}>
                    <option value="purchase_date:-1">Newest Purchase</option>
                    <option value="product_price:-1">Highest Price</option>
                    <option value="product_price:1">Lowest Price</option>
                    <option value="purchase_date:1">Latest Purchases</option>
                </select>  
                 </div> 
            </div>   
            <TableP data={this.state.data} />
          
            </div>
           </div>
          <div className="newp-button"><Link to="/newproduct"><button>  NEW PRODUCT</button></Link></div>
        </React.Fragment>
        )
    }
}



