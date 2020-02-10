import React from 'react'
import  './styles.css'

export default class SelectBox extends React.Component {
    constructor(props){
        super(props)
        this.state = {
              items: this.props.items || [],
              showItems : false,
        }
    }
    
    render(){

        return(
            <React.Fragment>

            <div className="select-box" style={{display: this.props.showItems ? 'block' : 'none'}}>
                 <button>Account</button>
                 <button>Sign Out!</button>
                 
            </div>
            
            </React.Fragment>
        )
    }
}