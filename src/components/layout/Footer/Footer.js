import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import logo from '../Header/logo1.png'
import './Footer.css'
const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='4'>
            <div className='logo'>
              <img src={logo} alt="Logo" />
              <div>
                <h1 className='text-white'>ASK Furniture</h1>
                {/* <p>AAI SHREE KHODIYAR FURNITURE</p> */}
              </div>
            </div>
              <p className='footer__text mt-4'>
                2/ Sector-4, Opp. to Vimannath Bus Stop, Nirnaynagar,Ranip road, Ahmedabad,
                Gujarat - 382481
              </p>
          </Col>
          <Col lg='3'>
            
            <div className='footer__quick-links'>
              <h4 className='quick__links-title'>Best Products</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/shop'>Double Beds</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/shop'>Study Tables</Link>
                </ListGroupItem>
                  
                  <ListGroupItem className='ps-0 border-0'>
                  
                  <Link to='/shop'>Modern Sofas</Link>
                  
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  
                  <Link to='/shop'>Office Chairs</Link>
                  
                </ListGroupItem>
              </ListGroup>
            </div>

          </Col>
          <Col lg='2'>
            
          <div className='footer__quick-links'>
              <h3 className='quick__links-title'>Useful Links</h3>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/shop'>Shop</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/cart'>Cart</Link>
                </ListGroupItem>
                  
                  <ListGroupItem className='ps-0 border-0'>
                  
                  <Link to='/login'>Login</Link>
                  
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  
                  <Link to='/aboutus'>About Us</Link>
                  
                </ListGroupItem>
              </ListGroup>
            </div>

          </Col>
          <Col lg='3'>
          <div className='footer__quick-links'>
              <h3 className='quick__links-title'>Contact</h3>
              <ListGroup className='footer__content'>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span><i className='ri-map-pin-line'></i></span>
                  <p> 2/ Sector-4, Opp. to Vimannath Bus Stop, Nirnaynagar,Ranip road, Ahmedabad,
                Gujarat - 382481</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                <span><i className='ri-phone-line'></i></span>
                  <p className='mb-2'> +91 98257 24635</p>
                </ListGroupItem>
                  
                  <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span><i className='ri-mail-line'></i></span>
                  <p className='mb-2'> askfurniture@gmail.com</p>                  
                  
                  
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='12'>
            <p className='footer__copyright'>Copyright 2023 - Developed by Aniket Panchal. All Rights Reserved</p>
          </Col>
       
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
