
import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../components/layout/Loader'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import { ClearErrors, getOrderDetails } from '../../actions/orderAction'
const OrderDetails = ({match}) => {
    
    const alert = useAlert()
    const dispatch = useDispatch()
    const {loading,error,order={}} = useSelector(state=>state.orderDetails)
    const {shippingInfo,orderItems,user,totalPrice,orderStatus} = order
    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }
    }, [dispatch, alert, error, match.params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
    
    // const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
        <MetaData title={'Order Details'} />

        {/* {loading ? <Loader /> : ( */}
            <Fragment>
                <div className="row d-flex justify-content-between ml-3">
                    <div className="col-12 col-lg-8 mt-5 order-details">

                        <h1 className="my-5">Order # {order._id}</h1>

                        <h4 className="mb-4">Shipping Info</h4>
                        <p><b style={{color:'black'}}>Name:</b> {user && user.name}</p>
                        <p><b style={{color:'black'}}>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b style={{color:'black'}}>Address:</b>{shippingDetails}</p>
                        <p><b style={{color:'black'}}>Amount:</b> ${totalPrice}</p>

                        <hr />

                        <h4 className="my-4">Payment Status:</h4>
                        {/* <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p> */}
                        <p className= "greenColor"><b>NOT PAID</b></p>


                        <h4 className="my-4">Order Status:</h4>
                        <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>


                        <h4 className="my-4">Order Items:</h4>

                        <hr />
                        <div className="cart-item my-1">
                            {orderItems && orderItems.map(item => (
                                <div key={item.product} className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="140" width="50" />
                                    </div>

                                    <div className="col-5 col-lg-5" >
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p style={{color:'black'}}><i class="fa fa-inr" id='symbol'></i> {item.price}</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p style={{color:'black'}}>{item.quantity} Piece(s)</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr />
                    </div>
                </div>
            </Fragment>
        {/* )} */}

    </Fragment>
)
}

export default OrderDetails
