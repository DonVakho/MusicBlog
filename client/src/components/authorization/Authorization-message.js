import React from 'react'
import Message from '../../styled-components/Message'

export default function AuthorizationMessage({ alreadyTried }) {
    return alreadyTried ? (<Message invalid> Username or Password is incorect </Message>) :
        (<Message valid> Please Enter your Username and Password to log in</Message>)
}
