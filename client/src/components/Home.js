//react imports
import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { } from "../assets/carousel/slide_1.jpg"
import { connect } from 'react-redux'
import { Query } from "react-apollo";
import { mapStateToProps, mapDispatchToProps } from '../redux/connectMaps'
import Posts from './profile/posts/Posts'
import FooterPage from './Footer'

//styled-components
import { GET_POSTS } from '../queries/queries'

class Home extends Component {
    constructor(props) {
        super(props)
        this.submit = this.loadPosts.bind(this)
    }
    loadPosts(posts) {
        this.props.LOAD_POSTS_ACTION(posts)
    }
    render() {
        return (
            <>
                <div style={{ paddingLeft: '17%', paddingTop: '1%' }}>
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
                    <div style={{  width: '100%' }}>
                        <Query query={GET_POSTS}>
                            {({ loading, error, data }) => {
                                if (loading) return <h3>...loading</h3>;
                                if (error) return `Error! ${error}`;
                                if (!this.props.posts.loaded)
                                    this.props.LOAD_POSTS_ACTION(data.posts)
                                return <>
                                </>
                            }}
                        </Query>
                        <Posts posts={this.props.posts.posts} />
                    </div>
                </div>
                <FooterPage />
            </>
        )
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)