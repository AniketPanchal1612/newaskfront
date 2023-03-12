import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'
import './product.css'
import { motion } from 'framer-motion'
const Product = ({ product }) => {
    return (
        <Col lg='3' md='4'>
            <div className='product__item mb-5 card rounded p-2'>
                <div className='product__img'>
                    <Link to={`/product/${product._id}`}>

                        <motion.img
                            whileHover={{ scale: 1.2 }}
                            className="card-img-top mx-auto"
                            src={product.images[0].url}
                        />
                    </Link>
                </div>
                <div className='p-2 product__info'>

                    <h3 className="card-title product__name">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h3>
                    <span className=''>{product.category}</span>
                </div>
                <div className="ratings mt-auto">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                </div>
                <div className='product__card-bottom d-flex align-item-center justify-content-between'>
                <span className='price'><i class="fa fa-inr" id='symbol'></i>  {product.price}</span>
                    <span>
                        {/* <i className='ri-add-line'></i> */}
                    </span>
                </div>
                <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block view-btn" >View Details</Link>


            </div>
        </Col>
    )
}

export default Product

    // <div className="col-sm-12 col-md-6 col-lg-3 my-3">
    //     <div className="card p-3 rounded">
    //         <img
    //             className="card-img-top mx-auto"
    //             src={product.images[0].url}
    //         />
    //         <div className="card-body d-flex flex-column">
    //             <h5 className="card-title">
    //                 <Link to={`/product/${product._id}`}>{product.name}</Link>
    //             </h5>
    //             <div className="ratings mt-auto">
    //                 <div className="rating-outer">
    //                     <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
    //                 </div>
    //                 <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
    //             </div>
    //             <p className="card-text">${product.price}</p>
    //             <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
    //         </div>
    //     </div>
    // </div>