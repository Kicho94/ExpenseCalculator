import React from 'react'

export default class TableP extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            
        }
    }


    render(){
        const tableR  =  this.props.data.map((d)=>{
             return <tr> 
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
        
        return <React.Fragment>
            <div>
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
            {tableR} 
        </tbody>
        </table>
</div>
 </React.Fragment>
    }
}