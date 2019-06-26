//react imports
import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import {} from "../assets/carousel/slide_1.jpg"

//styled-components

class Home extends Component {
    render() {
        return (
            <div style={{paddingLeft: '20%', paddingTop: '1%'}}>
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
            </div>
        )
    }
};
export default Home