import React from 'react'

export default function AuthorizationMessage({ alreadyTried }) {
    return alreadyTried ? (<h2> Username or Password is incorect </h2>) :
        (<h2> Please Enter your Username and Password to log in</h2>)
}
