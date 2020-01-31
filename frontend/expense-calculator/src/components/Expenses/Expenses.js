import React from 'react'
import Header from '../Header/Header'
import TableE from '../Tables/TableE'
import './expenses.css'
import datap from '../../DataP'


export default class Expenses extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : "Year",
            totalExpense: null
        }       
            }
    
    changeV = (event) => {
        
        this.setState({value : [event.target.value]})
       
    }
    
//    componentDidMount(){
//     var totalE = 0
//     for(let i=0;i<datap.length;i++){
//       totalE += datap[i].productPrice
//     }
//     this.setState({totalExpense : totalE})
//    }
    
   
    render() {
      
        return (<React.Fragment> 
                <div id="products-container">
             <Header />
            <div id="products-background">
            <div className="products-header">            
                <h1>Expenses</h1>
                </div>  
                <div className="expenses-header">
                     <div className="buttons-div">
                         <button className="mont-year">MONTHLY</button>
                         <button className="mont-year">YEARLY</button>
                     </div>
                 <div className="filter">                     
                  <p>Choose Month: </p>
                {/* <select value={this.state.value} onChange={this.changeV}>
                    <option value="year">Year</option>
                    <option value="highestPrice">Highest Price</option>
                    <option value="lowestPrice">Lowest Price</option>
                    <option value="latestPurchases">Latest Purchases</option>
                </select>   */}
                <input type="month"/>
                 </div>     
                 </div> 
                 <br/>
                 
            <TableE data={datap} />
            </div>           
           </div>
           <div className="expenses-footer">
                <div className="expenses-footerh1">
                    <h1>
                    Total spent : {this.state.totalExpense} den.
                    </h1>
                </div>
                </div>     
        </React.Fragment>
        )
    }
}



