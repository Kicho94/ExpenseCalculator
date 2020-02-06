import React from 'react'

export default class TableE extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            
        }
    }
   
 
    

    render(){
       
        var tableE = null;

      if(this.props.data.length > 0){
        
           tableE  =  this.props.data.map((d)=>{
           return <tr key={d.id}> 
                    <td>{d.product_name}</td>
                    <td>{d.product_type}</td>
                    <td>{d.product_desc}</td>
                    <td>{d.purchase_date}</td>
                    <td>{d.product_price}</td>
                  </tr>
        })
      }else if(this.props.data.length == undefined){
          console.log(this.props.data.length)
          tableE = 
          <tr >
                <td colSpan="5" style={{align : "center"}} >PLEASE CREATE YOUR FIRST PRODUCT</td>
          </tr>
        }; 
       
        return <div>
        <table className="products-table">
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Product Description</th>
                <th>Purchase Date</th>
                <th>Product Price</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {tableE} 
                </tbody>
        </table>
</div>
            
 
    }
}