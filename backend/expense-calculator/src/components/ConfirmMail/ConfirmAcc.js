import React from 'react'

export default class ConfirmAcc extends React.Component {
    constructor(){
        super()
        this.state = {

        }
    }

    componentDidMount(){
        fetch('api/v1/auth/reset-link')
    }
}