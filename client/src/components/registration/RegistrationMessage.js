import React from 'react'
import { Link } from 'react-router-dom'
import Message from '../../styled-components/Message'

export default function RegistrationMessage({ alreadyTried, valid, userExists }) {
    return alreadyTried ? userExists ? (<Message> This email is busy, try again </Message>) :
        valid ? (<Message valid> User was successfully registered go to <Link to='/login'>Login</Link></Message>) :
            (<Message > Confirmation password does not match, please try again</Message>) : <></>
}
