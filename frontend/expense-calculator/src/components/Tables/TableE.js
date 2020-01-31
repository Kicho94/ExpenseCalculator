import React from 'react'

export default class TableE extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            
        }
    }
   
 
    

    render(){
        console.log(this.props.data.length)
        var tableE = null;

      if(this.props.data.length > 0){
        console.log(this.props.data.length)
           tableE  =  this.props.data.map((d)=>{
           return <tr key={d.id}> 
          <td>{d.productName}</td>
          <td>{d.productType}</td>
          <td>{d.productDesc}</td>
          <td>{d.purchaseDate}</td>
          <td>{d.productPrice}</td>
          <td>
              <button><span><i className="far fa-edit"></i></span></button> 
              <button><span><i className="far fa-trash-alt"></i></span></button>
          </td>
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