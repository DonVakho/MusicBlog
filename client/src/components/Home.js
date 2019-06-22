import React, { Component } from 'react'
class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <button onClick={() => { this.props.history.push('/login') }}>Login</button>
                <button>Register</button>
            </div>
        )
    }
};
export default Home