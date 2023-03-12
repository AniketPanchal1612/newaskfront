import React, { Fragment } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Loader from './layout/Loader'
import './About.css'
const About = () => {
    return (
        <Fragment>
            <section className='trending__products'>
                <Container>
                    <Row>
                        <Col lg='12' className='text-center'>
                            <h2 className='section__title'>About Us</h2>
                        </Col>
                    </Row>

                </Container>

            </section>


            <Col>
                <section id="about__us" className="container">
                    <div className="row">
                        <p>Welcome to our website, where you'll find the finest quality wooden furniture products at affordable prices. We have been in the furniture manufacturing business for 25 years and have built a reputation for exceptional craftsmanship, attention to detail, and outstanding customer service.

                        </p>
                        <p>
                            Our furniture is designed and manufactured for a variety of settings, including commercial, residential, schools, and colleges. We use only the best quality materials, including premium woods, to create pieces that are both beautiful and durable.

                        </p>
                        <p>We are committed to ensuring customer satisfaction and offer a range of services to make the furniture-buying process easy and stress-free. From consultation and design to manufacturing and delivery, we are with you every step of the way.

                        </p>
                        <p>
                            Thank you for choosing us as your furniture partner. We look forward to serving you and helping you create beautiful spaces that you will love for years to come.

                        </p>
                    </div>
                </section>
            </Col>


        </Fragment>
    )
}

export default About
