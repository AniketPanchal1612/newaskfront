import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import './Cart.css'
import { useAlert } from 'react-alert'
import CheckoutSteps from './CheckoutSteps'

const ConfirmOrder = ({ history }) => {
    const dispatch = useDispatch()
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);
    const alert = useAlert();

    const itemPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const discount = Number((itemPrice * 5) / 100).toFixed(2);
    // const shippingPrice = itemPrice>200 ? 0:25
    // const taxPrice = Number((0.05* itemPrice).toFixed(2))
    // const totalPrice = ((shippingPrice+taxPrice+itemPrice)).toFixed(2)
    // console.log(taxPrice)
    const totalPrice = ((itemPrice) - discount).toFixed(2)

    const processToConfirm = async (e) => {
        e.preventDefault()
        const data = {
            itemPrice: itemPrice.toFixed(2),
            // shippingPrice,
            // taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))

        history.push('/confirm/final')
    }

    // console.log(error)



    return (
        <Fragment>
            <MetaData title={"Order Details"} />
            <CheckoutSteps shipping confirmOrder />
            <div className="row d-flex justify-content-between ml-5">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3" >Shipping Info</h4>
                    <p><b style={{ color: "black" }} >Name:</b> {user && user.name}</p>
                    <p><b style={{ color: "black" }}>Phone:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b style={{ color: "black" }}>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city} , ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {/* loop through each item display */}
                    {cartItems.map(item => (
                        <Fragment>

                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt="Laptop" height="110" width="50" />
                                    </div>

                                    <div className="col-5 col-lg-6 mt-3" >
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-lg-3 " >
                                        <p>{item.quantity} x <i class="fa fa-inr" id='symbol'></i> {item.price} = <b style={{ color: "black" }}><i class="fa fa-inr" id='symbol'></i> {(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />

                        </Fragment>

                    ))}
                </div>

                <div className="col-12 col-lg-3 my-4 mr-3">
                    <div id="order_summary">
                        <h4 style={{ color: "black" }}>Order Summary</h4>
                        <hr />
                        <p style={{ color: "black" }}>Subtotal:  <span className="order-summary-values" style={{ color: "black" }}><i class="fa fa-inr" id='symbol'></i> {(itemPrice).toFixed(2)}</span></p>
                        {/* <p style={{color:"black"}}>Shipping: <span className="order-summary-values" style={{color:"black"}}>${shippingPrice}</span></p> */}
                        {/* <p style={{color:"black"}}>Tax:  <span className="order-summary-values" style={{color:"black"}}>${taxPrice}</span></p> */}
                        <p style={{ color: "black" }} className='mt-3'>Discount(5%):  <span className="order-summary-values" style={{ color: "black" }}><i class="fa fa-inr" id='symbol'></i> {discount}</span></p>

                        <hr />

                        <p style={{ color: "black" }}>Total: <span className="order-summary-values" style={{ color: "black" }}    ><i class="fa fa-inr" id='symbol'></i> {totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block"
                            onClick={processToConfirm}
                        >Process to Order</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ConfirmOrder
