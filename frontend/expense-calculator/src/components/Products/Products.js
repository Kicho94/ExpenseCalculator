import React from 'react'
import Header from '../Header/Header'
import TableP from '../Tables/TableP'
import './products.css'


export default class Products extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : null
        }       
            }
    
    changeV = (event) => {
        
        this.setState({value : [event.target.value]})
       
    }
    componentDidUpdate(){
        console.log(this.state.value)
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
            <TableP/>
            </div>
           </div>
        </React.Fragment>
        )
    }
}



