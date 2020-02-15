import React from 'react'
import {  Redirect } from 'react-router-dom'



export default class TableP extends React.Component {
    constructor(props){
        super(props)
        this.state= {
          redirect : false,
          id : undefined
        }
    }
   showModal = (d) =>{
    this.props.getId(d);
    this.props.showModal()
   }
  
   redirect = (id) => {
    this.setState({id : id}, ()=>{this.setState({redirect : true})})
    
  }
  
    render(){
        if (this.state.redirect){
            return <Redirect to = {`/editproduct/${this.state.id}`} />
        }
      
      var tableR = null;
     
      if(this.props.data.length > 0){
           tableR  =  this.props.data.map((d)=> {
           return <tr  key={d._id} > 
            <td>{d.product_name}</td>
            <td>{d.product_type}</td>
            <td>{d.product_desc}</td>
            <td>{new Date(d.purchase_date).toISOString().substring(0, 10)}</td>
            <td>{d.product_price}</td>
            <td>
              <button onClick={()=> {this.redirect(d._id)}}> <span> <i className="far fa-edit"></i> </span> </button> 
              <button onClick={()=> {this.showModal(d._id)}}> <span> <i className="far fa-trash-alt" ></i> </span> </button>
            </td>
      </tr>
        })
      }else if(this.props.data.length ==  0 || undefined){
            tableR =
                <tr >
                    <td colSpan="5" style={{align : "center"}} >PLEASE CREATE YOUR FIRST PRODUCT</td>
                </tr>
                    
        }; 
            
        return ( 
              <React.Fragment>
        
            <div className="products-table-main">
            
    <table className="products-table" >   
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
            {tableR} 
        </tbody>
    </table>
</div>
 </React.Fragment>
 )
    }
}