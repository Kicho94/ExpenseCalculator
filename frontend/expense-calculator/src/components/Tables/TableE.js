import React from 'react'

export default class TableP extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            
        }
    }
    totalE = () => {
        var totalE = 0
        for(i=0;i<this.props.data.lenght;i++){
          totalE +  this.props.data.productPrice
        }
        return totalE
    }

    render(){
        const tableE  =  this.props.data.map((d)=>{
             return <tr> 
            <td>{d.productName}</td>
            <td>{d.productType}</td>
            <td>{d.productDesc}</td>
            <td>{d.purchaseDate}</td>
            <td>{d.productPrice}</td>
            
        </tr>
        const totalE = this.props.data.map((d)=>{
            
        })

           
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