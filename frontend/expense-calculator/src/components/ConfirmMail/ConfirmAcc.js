import React from 'react'

export default class ConfirmAcc extends React.Component {
    constructor(){
        super()
        this.state = {

        }
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8081/api/v1/reset-link')
    }
}