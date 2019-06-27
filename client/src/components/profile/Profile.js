//General Imports
import React, { Component } from 'react'
import { Query } from "react-apollo";

//***********************************************
import { GET_PROFILE } from '../../queries/queries'
import Posts from '../posts/Posts'

//Redux Imports
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../redux/connectMaps'

export class Profile extends Component {
    render() {
        return (
            <>
                <Query query={GET_PROFILE} variables={{ email: this.props.user.email }}>
                    {({ loading, error, data }) => {
                        if (loading) return <h3>...loading</h3>;
                        if (error) return `Error! ${error}`;
                        return <>
                            <Posts posts={data.user.posts} />
                        </>
                    }}
                </Query>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)