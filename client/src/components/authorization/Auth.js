//General Imports
import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { Button } from 'react-bootstrap';

//Redux Imports
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../redux/connectMaps'

//********************************************************
import { GET_AUTHORIZARION } from '../../queries/queries'
import AuthorizationMessage from './Authorization-message'
import LoginInput from '../../styled-components/LoginInput'
import LoginForm from '../../styled-components/LoginForm'
import Label from '../../styled-components/Label'


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
            this.props.LOG_IN_ACTION({
                firstName: queryData.userConf.firstName,
                lastName: queryData.userConf.lastName,
                id: queryData.userConf.id,
                created: queryData.userConf.created,
                modified: queryData.userConf.modified,
                email: queryData.userConf.email
            })
            this.props.history.push('/')

        }
    }
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <>
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
                        }} >
                            <Label> Email: </Label>
                            <LoginInput type="text" name="email" onChange={(e) => this.inputChange(e)} value={this.state.email} />
                            <Label>Password: </Label>
                            <LoginInput type="password" name="password" onChange={e => this.inputChange(e)} value={this.state.password} />
                            <Button type="submit">Submit</Button>
                            <AuthorizationMessage alreadyTried={this.state.alreadyTried} />
                        </LoginForm>
                    </>
                )}
            </ApolloConsumer>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)