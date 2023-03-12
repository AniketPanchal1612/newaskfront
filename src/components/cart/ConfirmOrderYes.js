import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import './Cart.css'
import {useAlert} from 'react-alert'
import CheckoutSteps from './CheckoutSteps'
import { ClearErrors, createOrder } from '../../actions/orderAction'
const phoneNumber = "tel:+917575024635";
const ConfirmOrderYes = ({history}) => {
    
    const alert = useAlert();
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth)
    const {cartItems, shippingInfo} = useSelector(state=>state.cart);
    const {error} = useSelector(state=>state.newOrder);
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(ClearErrors())
        }

    },[dispatch,error,alert])
    const order={
        orderItems: cartItems,
        shippingInfo
      }
    
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if(orderInfo){
        order.itemPrice = orderInfo.itemPrice
        // order.shippingPrice = orderInfo.shippingPrice
        // order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
      }
    const submitHandler=(e)=>{
        e.preventDefault();

        dispatch(createOrder(order))
        history.push('/success')

    }
    return (
    <Fragment>
      <MetaData title={'Confirm Order'} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler} >
            

            

            <div className="form-group">
              In case any query regarding products and face technical error then contact us 
            </div>
            <div className="form-group">
              After make orders we will contact you for any doubt regarding products and quality
            </div>

            <a href={phoneNumber} >
            <button id='call_btn'>Call us now</button>
            </a>
            <button
              id="pay_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              Confirm Order 
            </button>

          </form>
        </div>
      </div>

    </Fragment>
  )
}

export default ConfirmOrderYes
