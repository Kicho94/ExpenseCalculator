import React from 'react'

export default class TableP extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            totalExpense : null
        }
    }
    totalE = () => {
        var totalE = 0
        if(this.props.data.length > 2){
        for(let i=0;i<this.props.data.length;i++){
          totalE += this.props.data[i].productPrice
        }
    }
        this.setState({totalExpense : totalE})
    }
 
    componentDidMount(){
        this.totalE()
    }

    render(){
      console.log(this.props.data);
      var tableR = null;

      if(this.props.data.length > 0){
           tableR  =  this.props.data.map((d)=> {
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
            tableR =
                <tr >
                    <td colSpan="5" style={{align : "center"}} >PLEASE CREATE YOUR FIRST PRODUCT</td>
                </tr>
                    
        }; 
            
        return ( 
                    <React.Fragment>
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
 )
    }
}