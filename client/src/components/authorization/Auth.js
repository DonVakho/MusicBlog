import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { GET_AUTHORIZARION } from '../../queries/queries'
import AuthorizationMessage from './Authorization-message'
import StateHolder from './StateHolder'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            authorized: false,
            alreadyTried: false
        }
        this.inputChange = this.inputChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    inputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submit(queryData) {
        if (!queryData.userConf)
            this.setState({
                authorized: false,
                alreadyTried: true
            })
        else {
            StateHolder.login()
            this.props.history.push('/profile')
        }
    }
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <>
                        <form onSubmit={async (e) => {
                            e.preventDefault()
                            const { data } = await client.query({
                                query: GET_AUTHORIZARION,
                                variables: {
                                    email: this.state.email,
                                    password: this.state.password
                                }
                            });
                            this.submit(data);
                        }}>
                            <label> Email: </label>
                            <input type="text" name="email" onChange={(e) => this.inputChange(e)} value={this.state.email} />
                            <label>Password: </label>
                            <input type="password" name="password" onChange={e => this.inputChange(e)} value={this.state.password} />
                            <button type="submit">Submit</button>
                        </form>
                        <AuthorizationMessage alreadyTried={this.state.alreadyTried} />
                    </>
                )}
            </ApolloConsumer>
        )
    }
}
export default Auth