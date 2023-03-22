import React, { Fragment, useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import MetaData from './layout/MetaData'
import heroImg from '../assets/images/hero-img.png'
import './Home.css'
import Services from './layout/Services/Services'
import { getProducts, getTrendingProducts, getBestProducts } from '../actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import Product from './products/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom'
import Img from '../assets/images/counter-timer-img.png'
import Clock from './products/Clock'

const phoneNumber = "tel:+919825724635";

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');

    const categories = [
        'Sofas', 'Chairs', 'Beds', 'Study Tables', 'TV & Media Units', 'Kitchen & Decor', 'Dining Sets', 'Wardrobes', 'Outdoors'
    ]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    const year = new Date().getFullYear();
    const { loading, products, error, productsCount, success, resPerPage, filteredProductCount } = useSelector(state => state.products)
    // const {loading,error,products} = useSelector(state=>state.trendingProducts)
    console.log(products)
    const dispatch = useDispatch();
    const alert = useAlert();

    const keyword = match.params.keyword



    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        // if(success){
        //      alert.success("Products fetched successfully")
        // }
        dispatch(getProducts(keyword, currentPage, price, category))

    }, [dispatch, alert, error, currentPage, keyword, price, category])
    // function setCurrentPageNo(pageNumber) {
    //     setCurrentPage(pageNumber)
    // }

    // let count = productsCount;
    // if(keyword){
    //     count = filteredProductCount
    // }
    return (
        <Fragment>

            <section className='hero__section'>
                <MetaData title={'Buy Best Furniture Products'} />
                <Container>
                    <Row>
                        <Col lg='6' md='6'>
                            <div className='hero__content'>
                                <p className='hero__subtitle'>Treding Products in {year}</p>
                                <h2>Make Your Interior More Minimalist & Modern</h2>
                                <p>Your home should be a story of who you are, and be a collection of what you love </p>
                                <p style={{ fontWeight: '500' }}>Explore and Order Quality Products with fully customize according to your choice </p>
                                <Link to='/shop' className='shop__btn'>SHOP NOW</Link>
                                <a href={phoneNumber} className='shop__btn ml-2' style={{ color: 'white' }}>Call Now</a>
                                {/* <button className='shop__btn'>SHOP NOW</button> */}

                                {/* <Link to='/shop' className='shop__btn'>CALL NOW</Link> */}

                            </div>
                        </Col>
                        <Col lg='6' md='6'>
                            <div className='hero__img'>
                                <img src={heroImg} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Services />

            <section className='trending__products'>
                <Container>
                    <Row>
                        <Col lg='12' className='text-center'>
                            <h2 className='section__title'>Trending Products</h2>
                        </Col>
                    </Row>

                </Container>

            </section>

            <Fragment>

                {/* <div className='container container-fluid'> */}
                {
                    loading ? <Loader /> : (

                        <Col>
                            <section id="products" className="container">
                                <div className="row">
                                    {products && products.filter(product => product._id === "64174f27fcd6121115e1aa28").map(product => (

                                        <Product key={product._id} product={product} />
                                    ))}
                                    {products && products.filter(product => product._id === "64175e41d2e18b4a5c44f982").map(product => (

                                        <Product key={product._id} product={product} />
                                    ))}
                                     {products && products.filter(product => product._id === "6417563b1498c85d979f612b").map(product => (

                                        <Product key={product._id} product={product} />
                                    ))}
                                    {products && products.filter(product => product._id === "64174550fcd6121115e1a9ee").map(product => (

                                        <Product key={product._id} product={product} />
                                    ))}
                                </div>
                            </section>
                        </Col>
                    )
                }
                {/* </div> */}
            </Fragment>
            <section className='timer__count'>
                <Container>
                    <Row>
                        <Col lg='6' md='12' className='count__down-col'>
                            <div className='clock__top-content ml-5' >
                                <h4 className='text-white fs-6 mb-2'>Limited Offer</h4>
                                <h3 className='text-white fs-5 mb-3'>Double Bed</h3>
                            </div>
                            <Clock />
                            {/* <button className=' shop__btn visit_btn'> */}
                            <Link to='/shop' className='shop__btn visit__btn ml-5'>Visited Store</Link>
                            {/* </button> */}
                        </Col>
                        <Col lg='6' md='12' className='text-end counter__img'>
                            <img src={Img}></img>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='trending__products'>
                <Container>
                    <Row>
                        <Col lg='12' className='text-center'>
                            <h2 className='section__title'>Best Products</h2>
                        </Col>
                    </Row>

                </Container>

            </section>


            <Fragment>


                {
                    loading ? <Loader /> : (

                        <Col>
                            <section id="products" className="container">
                                <div className="row">
                                    {products && products.filter(product => product.category === "Sofas").slice(0, 4).map(product => (

                                        <Product key={product._id} product={product} />
                                    ))}
                                </div>
                            </section>
                        </Col>
                    )
                }

            </Fragment>


        </Fragment>
    )
}

export default Home