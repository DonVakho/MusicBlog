//react imports
import React, { Component } from 'react'

//styled-components
import Button from '../styled-components/Button'

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to the React app</h1>
                <Button onClick={() => { this.props.history.push('/login') }}>Login</Button>
                <Button onClick={() => {this.props.history.push('/register')}}>Register</Button>
            </div>
        )
    }
};
export default Home