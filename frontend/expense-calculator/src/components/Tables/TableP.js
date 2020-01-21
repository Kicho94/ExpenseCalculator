import React from 'react'

export default class TableP extends React.Component {
    render() {
        return <React.Fragment>
            <div >
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
            <tr>
                <td>Coca Cola</td>
                <td>Drink</td>
                <td>carbonated soft drink</td>
                <td>19.04.2019</td>
                <td>75</td>
                <td>
                    <button><span><i className="far fa-edit"></i></span></button> 
                    <button><span><i className="far fa-trash-alt"></i></span></button>
                </td>
            </tr>
        </tbody>
        </table>
</div>
 </React.Fragment>
    }
}