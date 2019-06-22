import React, { Component } from 'react'
import StateHolder from '../authorization/StateHolder'

export class Profile extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
        console.log(StateHolder.getStatus())
    }
    logout(){
        StateHolder.logout()
        this.props.history.push('/login')
    }    
    render() {
        return (
            <div>
                Profile
       
            </div>
        )
    }
}

export default Profile
