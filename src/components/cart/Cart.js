import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../components/layout/Loader'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import './Cart.css'
import { addItemToCart, removeItemFromCart } from '../../actions/cartAction'
const Cart = ({history}) => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }
    const checkoutHandler=()=>{
        history.push('/login?redirect=shipping')
    }
    const increaseQty = (id, quantity, stock) => {

        const newQty = quantity + 1
        if (newQty > stock) return;

        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {

        const newQty = quantity - 1
        if (newQty <= 0) return;

        dispatch(addItemToCart(id, newQty))

    }
    return (
        <Fragment>
            <MetaData title={'My Cart'} />
            {cartItems.length === 0 ? 
            <Fragment>

            <h2 className='mt-5' style={{marginBottom:'30px', textAlign:'center'}}>Your Cart is Empty</h2> 
            <h4 className='mt-5' style={{marginBottom:'300px', textAlign:'center',color:'blue'}}><Link to='/shop'>Go to Shop</Link></h4> 
            
            </Fragment>:
                (
                    <Fragment className='ml-5'>
                        <h2 className="mt-5 ml-5">Your Cart: <b>{cartItems.length} items</b></h2>

                        <div className="row d-flex justify-content-between ml-4">
                            <div className="col-12 col-lg-8">

                                {cartItems.map(item => (
                                    <Fragment>
                                        <hr />
                                        <div className="cart-item" key={item.product}>
                                            <div className="row">
                                                <div className="col-4 col-lg-3">
                                                    <img src={item.image} alt="Laptop" height="140" width="50" />
                                                </div>

                                                <div className="col-5 col-lg-3">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p id="card_item_price"><i class="fa fa-inr" id='symbol'></i> {item.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <div className="stockCounter d-inline">
                                                        <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)} >-</span>
                                                        <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                        <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}  >+</span>
                                                    </div>
                                                </div>

                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    {/* //item.product = id of product */}
                                                    <i id="delete_cart_item" className="fa fa-trash"
                                                        onClick={() => removeCartItemHandler(item.product)}></i>
                                                </div>

                                            </div>
                                        </div>
                                        <hr />
                                    </Fragment>
                                ))}
                            </div>

                            <div className="col-12 col-lg-3 my-4">
                                <div id="order_summary">
                                    <h4>Order Summary</h4>
                                    <hr />
                                    <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                                    <p>Est. total: <span className="order-summary-values"><i class="fa fa-inr" id='symbol'></i> {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span></p>

                                    <hr />
                                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler} >Check out</button>
                                </div>
                            </div>
                            
                        {/* </div> */}
                        </div>

                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default Cart
