import React from 'react'
import {motion} from 'framer-motion'
import './Sevices.css'
import { Col, Container, Row } from 'reactstrap'
import ServiceData from '../../../assets/data/serviceData'
import { Icon } from '@iconify/react';

const Services = () => {
  return (
    <section className='services'>
        <Container>
        
            <Row>
                {
                    ServiceData.map((item,index)=>
                    
                <Col lg='3' md='4' key={index}>
                    <motion.div whileHover={{scale:1.1}} className='service__item' style={{background:`${item.bg}`}}>
                        <span><i class={item.icon} icon={item.icon}></i></span>
                        <div>
                            <h3>{item.title}</h3>
                        </div>
                    </motion.div>
                </Col>
                    )
                }
            </Row>
        </Container>
    </section>
  )
}

export default Services
