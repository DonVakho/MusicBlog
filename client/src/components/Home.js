import React, { Component } from 'react'
import Button from '../styled-components/Button'
class Home extends Component {
    constructor(props) {
        super(props)
    }
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