import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-bootstrap'
import './ProductDetail.css'
import { ClearErrors, getProductDetail, newReview } from '../../actions/productAction'
import Loader from '../../components/layout/Loader'
import MetaData from '../layout/MetaData'
import { addItemToCart } from '../../actions/cartAction'
import { NEW_REVIEW_RESET } from '../../constants/ProductConstant'
import ListReview from '../review/ListReview'
import Product from './Product'
import { Col, Container, Row } from 'reactstrap'
const phoneNumber = "tel:+919825724635";
// import {FiPhoneCall} from 'react-icons'
// import { FiPhoneCall } from "@react-icons/all-files/fi/FiPhoneCall";

const ProductDetail = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const [rating, setRating] = useState(0);
    const [comment, setCommment] = useState("");
    const { user } = useSelector(state => state.auth);
    const { loading, error, product } = useSelector(state => state.productDetails)
    const Pcategory = product.category
    const Pid = product._id
    const { error: riviewError, success } = useSelector(state => state.newReview)
    const { products } = useSelector(state => state.products)
    useEffect(() => {
        dispatch(getProductDetail(match.params.id))
        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }
        if (riviewError) {
            alert.error(riviewError);
            dispatch(ClearErrors())
        }
        if (success) {
            alert.success('Review posted successfully')
            dispatch({ type: NEW_REVIEW_RESET })
        }
    }, [dispatch, alert, error, match.params.id, riviewError, success])

    const [quantity, setQuantity] = useState(1)

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        alert.success("Item added to cart")
    }

    const increaseQty = () => {
        const count = document.querySelector('.count')

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {

        const count = document.querySelector('.count')

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)

    }
    function setUserRatings() {
        const starts = document.querySelectorAll('.star');

        starts.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })
        function showRatings(e) {
            starts.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');
                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }
                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }
                if (e.type === 'click') {
                    star.classList.remove('yellow')
                }
            })
        }
    }
    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', match.params.id);

        dispatch(newReview(formData))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="container container-fluid">
                        <div className="row f-flex justify-content-around">
                            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                <Carousel pause='hover'>
                                    {product.images && product.images.map(image => (
                                        <Carousel.Item key={image.public_id}>
                                            <img
                                                className='d-block w-100' src={image.url} alt={product.title} />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>

                            <div className="col-12 col-lg-5 mt-5">
                                <h3 className='title'>{product.name}</h3>
                                <p id="product_id">Product # {product._id}</p>

                                <hr />
                                <p>For any query or know exact price or more details about Product Dimensions</p>
                                <a href={phoneNumber} >
                                    {/* <FiPhoneCall /> */}
                                    <button id='call_btn'>Call us now</button>
                                </a>
                                <a></a>
                                <hr />

                                <div className="rating-outer">
                                    <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                                </div>
                                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                                <hr />

                                <p id="product_price"><i class="fa fa-inr"></i> {product.price}</p>
                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus" onClick={decreaseQty} >-</span>

                                    {/* <input type="number" className="form-control count d-inline num" readOnly /> */}
                                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />


                                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                                </div>

                                <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" onClick={addToCart} disabled={product.stock === 0} >Add to Cart</button>
                                <hr />

                                <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'In stock' : 'Out of stock'}</span></p>

                                <hr />


                                
                                <div class="product-info">
                                    <h5>Material:  <span style={{fontWeight:'400'}}>{product.material}</span></h5>
                                   
                                </div>

                                <div class="product-info">
                                    <h5>Dimensions:  <span style={{fontWeight:'400'}}>{product.dimensions}</span></h5>
                                   
                                </div>

                                <div class="product-info">
                                    <h5>Color  : <span style={{fontWeight:'400'}}>{product.color}</span></h5>
                                    
                                </div>

                                <div class="product-info">
                                    <h5>Storage  : <span style={{fontWeight:'400'}}>{product.storage}</span></h5>
                                    
                                </div>

                                <div class="product-info">
                                    <h5>Warrenty  :  <span style={{fontWeight:'400'}}><strong>{product.warrenty}</strong></span></h5>
                                   
                                </div>
                                <hr />
                                <h4 className="mt-2 mb-2">Description:</h4>
                                <p>{product.description}</p>
                
                                <hr />
                                <p id="product_seller mb-3"><span className='mr-5'>Sold by: <strong className='seller'>{product.seller}</strong></span> Category: <strong className='seller'>{product.category}</strong></p>




                                {/* if user exist then they submit review */}
                                {user ?
                                    <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal"
                                        onClick={setUserRatings}

                                    >
                                        Submit Your Review
                                    </button>
                                    :
                                    <div className='alert alert-danger mt-5 ' type='alert'>Login to post your review</div>

                                }

                                <div className="row mt-2 mb-5">
                                    <div className="rating w-50">

                                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">

                                                        <ul className="stars" >
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                        </ul>

                                                        <textarea name="review" id="review" className="form-control mt-3"
                                                            value={comment}
                                                            onChange={(e) => setCommment(e.target.value)}
                                                        >

                                                        </textarea>

                                                        <button id='review_btn' className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close"
                                                            onClick={reviewHandler}
                                                        >Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>



                    {product.reviews && product.reviews.length > 0 && (
                        <ListReview reviews={product.reviews} />

                    )}

                    <section className='trending__products'>
                        <Container>
                            <Row>
                                <Col lg='12' className='text-center'>
                                    <h2 className='section__title'>Similar Products</h2>
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
                                            {products && products.filter(product => product.category === Pcategory).slice(0, 4).map(product => (

                                                <Product key={product._id} product={product} />
                                            ))}
                                        </div>
                                    </section>
                                </Col>
                            )
                        }
                        {/* </div> */}
                    </Fragment>

                    <section className='trending__products'>
                        <Container>
                            <Row>
                                <Col lg='12' className='text-center'>
                                    <h2 className='section__title'>Other Products</h2>
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
                                            {products && products
                                                // filter(product._id !== Pid)
                                                .slice(0, 4).map(product => (

                                                    <Product key={product._id} product={product} />
                                                ))}
                                        </div>
                                    </section>
                                </Col>
                            )
                        }
                        {/* </div> */}
                    </Fragment>
                </Fragment>


            )}
        </Fragment>
    )
}

export default ProductDetail
