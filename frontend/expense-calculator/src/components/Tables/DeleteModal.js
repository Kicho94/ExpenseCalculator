import React from 'react'
import './DeleteModal.css'



export default class DeleteModal extends React.Component {
    constructor(props){
        super(props)
      
   }  
       render(){
     
  return (
    
     <div className="modal">

      <header className="modal_header">
           <h2>Delete Product</h2>
      </header>

      <section className="modal_content">
            <p>You are about to delete this product. Are you sure you wish to continue? {this.props.name}</p>
      </section>

      <section className="modal_actions">
           <button onClick={this.props.cancel} className="btn-cancel">Cancel</button>
           <button className="btn-delete" onClick={this.props.deleteProduct}>Delete</button>
     </section>

     </div>
     
  )
}
}