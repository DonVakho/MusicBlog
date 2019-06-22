import React from 'react'
import StateHolder from './components/authorization/StateHolder'
import { Route, Redirect } from 'react-router-dom'
const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (StateHolder.getStatus()){
                    return <Component {...props} />
                }else{
                    return <Redirect to = {
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
export default ProtectedRoute