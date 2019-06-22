import React from 'react'
import Message from '../../styled-components/Message'

export default function RegistrationMessage({ alreadyTried, valid, userExists }) {
    return alreadyTried ? userExists ? (<Message> This email is busy, try again </Message>) :
        valid ? (<Message valid> User was successfully registered </Message>) :
            (<Message > Confirmation password does not match, please try again</Message>) : <h3 />
}
