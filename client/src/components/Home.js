//General Imports
import React, { Component } from 'react'
import { Query } from "react-apollo";
import { Carousel, Spinner } from 'react-bootstrap'

//Redux Imports
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../redux/connectMaps'

//*********************************************
import { GET_POSTS } from '../queries/queries'
import Posts from '../components/posts/Posts'
import FooterPage from './Footer'
import { Button } from 'react-bootstrap';


class Home extends Component {
    render() {
        return (
            <>
                <div style={{ paddingLeft: '17%', paddingTop: '7%' }}>
                    <Carousel className="d-block w-75">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={require("../assets/carousel/slide_1.jpg")}
                                alt="Led Zeppelin"
                            />
                            <Carousel.Caption>
                                <h3>Led Zeppelin</h3>
                                <p>Hard rock, Blues rock, Folk rock, Heavy metal</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={require("../assets/carousel/slide_2.jpg")}
                                alt="Rammstein"
                            />

                            <Carousel.Caption>
                                <h3>Rammstein</h3>
                                <p>Neue Deutsche Härte, Hard rock, Industrial metal, Gothic metal</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={require("../assets/carousel/slide_3.jpg")}
                                alt="Porcupine Tree"
                            />

                            <Carousel.Caption>
                                <h3>Porcupine Tree</h3>
                                <p>Progressive rock, Progressive metal, Post-progressive, Psychedelic rock
                                   Alternative rock</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={require("../assets/carousel/slide_4.jpg")}
                                alt="Pink Floyd"
                            />

                            <Carousel.Caption>
                                <h3>Pink Floyd</h3>
                                <p>Progressive rock, Art rock, Psychedelic rock</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={require("../assets/carousel/slide_5.jpg")}
                                alt="Nick Cave"
                            />

                            <Carousel.Caption>
                                <h3>Nick Cave</h3>
                                <p>	Post-punk, Gothic rock, Alternative rock, Experimental rock, Garage rock</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div >
                <div style={{ paddingLeft: '11%', paddingRight: '5%', paddingTop: '1%', width: '90%' }}>
                    {!this.props.posts.loaded ?
                        <Query query={GET_POSTS}>
                            {({ loading, error, data }) => {
                                if (loading) return (
                                    <div style={{ paddingLeft: '47%' }}>
                                        <Spinner animation="border" role="status" variant="primary">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    </div>
                                )
                                if (error) return `Error! ${error}`;
                                this.props.LOAD_POSTS_ACTION(data.posts)
                                return <></>
                            }}
                        </Query> : <></>
                    }
                    <Posts posts={this.props.posts.posts.filter((post) => {
                        if (post.user.firstName.toLowerCase() === this.props.posts.filter.toLowerCase())
                            return true
                        if (post.user.lastName.toLowerCase() === this.props.posts.filter.toLowerCase())
                            return true
                        if (post.title.toLowerCase().includes(this.props.posts.filter.toLowerCase()))
                            return true
                        return false
                    })} />
                    {this.props.posts.filter !== '' ?
                        <Button variant="warning" style={{ width: '100%', fontWeight: 'bold', fontSize: 'large', color: 'black' }} onClick={() => this.props.SEARCH_ACTION('')}>Undo Search</Button>
                        : <></>}
                </div>
                <FooterPage />
            </>
        )
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)