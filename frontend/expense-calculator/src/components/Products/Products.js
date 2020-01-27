import React from 'react'
import Header from '../Header/Header'
import TableP from '../Tables/TableP'
import './products.css'
import datap from '../../DataP'
import {Link} from 'react-router-dom'



export default class Products extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : "Year",
            
        }       
            }
    
    changeV = (event) => {
        
        this.setState({value : [event.target.value]})
       
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
                    <option value="year">Year</option>
                    <option value="highestPrice">Highest Price</option>
                    <option value="lowestPrice">Lowest Price</option>
                    <option value="latestPurchases">Latest Purchases</option>
                </select>  
                 </div> 
            </div>   
            <TableP data={datap} />
          
            </div>
           </div>
          <div className="newp-button"><Link to="/newproduct"><button>  NEW PRODUCT</button></Link></div>
        </React.Fragment>
        )
    }
}



