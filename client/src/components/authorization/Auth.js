//react imports
import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'

//my components
import { GET_AUTHORIZARION } from '../../queries/queries'
import AuthorizationMessage from './Authorization-message'
import StateHolder from '../StateHolder'

//styled-components
import LoginInput from '../../styled-components/LoginInput'
import LoginForm from '../../styled-components/LoginForm'
import Button from '../../styled-components/Button'

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
            StateHolder.setEmail(queryData.userConf.email)
            this.props.history.push('/profile')
        }
    }
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <>
                        <Button onClick={() => { this.props.history.push('/') }}>Back</Button>
                        <LoginForm onSubmit={async (e) => {
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
                            <LoginInput type="text" name="email" onChange={(e) => this.inputChange(e)} value={this.state.email} />
                            <label>Password: </label>
                            <LoginInput type="password" name="password" onChange={e => this.inputChange(e)} value={this.state.password} />
                            <Button submit type="submit">Submit</Button>
                            <AuthorizationMessage alreadyTried={this.state.alreadyTried} />
                        </LoginForm>
                    </>
                )}
            </ApolloConsumer>
        )
    }
}
export default Auth