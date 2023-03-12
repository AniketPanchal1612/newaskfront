import React, { Fragment, useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import MetaData from './layout/MetaData'
import heroImg from '../assets/images/hero-img.png'
import './Shop.css'
import { Link } from 'react-router-dom'
import Services from './layout/Services/Services'
import { getProducts } from '../actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import Product from './products/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination'
import { Route } from 'react-router-dom'
import Search from './layout/Search'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'


const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Shop = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');

    const categories = [
        'Bookcases and shelves', 'Dining Tables', 'Shoes Racks', 'Sofas', 'Chairs', 'Single Beds', 'Double Beds', 'Study Tables', 'TV & Media Units', 'Kitchen & Decor', 'Dining Sets', 'Wardrobes', 'Outdoors'
    ]

    const year = new Date().getFullYear();
    const { loading, products, error, productsCount, success, resPerPage } = useSelector(state => state.products)
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
    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }


    return (
        <Fragment>

            {/* <div className='container container-fluid'> */}
            {
                loading ? <Loader /> : (
                    <Fragment>
                        <MetaData title={'Buy Best Furniture Products'} />
                        <section>
                            <Container>
                                <Row>
                                    <Col className='search' lg='6' md='6'>
                                        <Route className='search' render={({ history }) => <Search history={history} />} />

                                    </Col>
                                    <Col lg='6' md='6'>
                                        <div className='filter__widget'>
                                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="pl-0">
                                                <option >
                                                Select By Category
                                                    
                                                </option>
                                                {categories.map((category) => (

                                                    <option
                                                        style={{
                                                            cursor: 'pointer',
                                                            listStyleType: 'none'
                                                        }}
                                                        key={category}
                                                        value={category}
                                                    // onClick={() => setCategory(category)}
                                                    >
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </Col>

                                </Row>
                            </Container>
                        </section>
                        {/* <div className="col-12 col-md-6 mt-2 mt-md-0 search">
                            <Route render={({ history }) => <Search history={history} />} />
                        </div> */}

                        <section id="products" className="container">
                            <div className="row">


                                {products && products.map(product => (

                                    <Product key={product._id} product={product} />
                                ))
                                }

                            </div>
                        </section>

                        {resPerPage <= productsCount && (

                            <div className='d-flex justify-content-center mt-6'>
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText={'Next'}
                                    prevPageText={'Prev'}
                                    firstPageText={'First'}
                                    lastPageText={'Last'}

                                    //css
                                    itemClass='page-item'
                                    linkClass='page-link'
                                />
                            </div>
                        )

                        }
                    </Fragment>
                )
            }

        </Fragment>
    )
}

export default Shop
                                // <Fragment>
                                //     <div className='col-6 col-md-3 mt-5 mb-5'>
                                //         <div className='px-5'>
                                //             {/* <Range
                                //                 marks={{
                                //                     1: `$1`,
                                //                     1000: `$1000`
                                //                 }}
                                //                 min={1}
                                //                 max={1000}
                                //                 defaultValue={[1, 1000]}
                                //                 tipFormatter={value => `$${value}`}
                                //                 tipProps={{
                                //                     placement: "top",
                                //                     visible: true
                                //                 }}
                                //                 value={price}
                                //                 onChange={price => setPrice(price)}
                                //             /> */}
                                //             <hr className='my-5' />
                                //             <div className="mt-5">
                                //                 <h4 className="mb-3">
                                //                     Categories
                                //                 </h4>

                                                // <select value={category} onChange={(e)=>setCategory(e.target.value)} className="pl-0">
                                                //     <option >Select By Category</option>
                                                //     {categories.map(category => (

                                                //         <option
                                                //             style={{
                                                //                 cursor: 'pointer',
                                                //                 listStyleType: 'none'
                                                //             }}
                                                //             key={category}
                                                //             value={category}
                                                //             // onClick={() => setCategory(category)}
                                                //         >
                                                //             {category}
                                                //         </option>
                                                //     ))}
                                                // </select>
                                //             </div>
                                //         </div>
                                //     </div>



                                // </Fragment>