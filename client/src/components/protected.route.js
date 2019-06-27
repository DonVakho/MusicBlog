//General Imorts
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

//Redux Imports
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../redux/connectMaps'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (rest.user.loggedIn) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)