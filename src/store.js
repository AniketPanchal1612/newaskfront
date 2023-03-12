import {createStore, combineReducers, applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducer,ProductDetailReducer, TrendingProductReducer, BestProductReducer, newReviewReducer, newProductReducer, productsReducer, productReviewsReducer, ReviewReducer } from './reducres/productReducer'
import { allUsersReducers, authReducer, forgotPasswordReducer, userDetailsReducer, userReducer } from './reducres/authReducer'
import { cartReducer } from './reducres/cartReducer'
import { allOrderReducer, myOrderReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducres/orderReducer'


const reducer = combineReducers({
    products:productsReducer,
    newProduct: newProductReducer,
    product: productReducer, 
    productDetails: ProductDetailReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    allOrders: allOrderReducer,
    order: orderReducer,
    allUsers: allUsersReducers,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: ReviewReducer
})

let intialState ={
cart:{
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[],
    shippingInfo : JSON.parse(localStorage.getItem('shippingInfo')) ? JSON.parse(localStorage.getItem('shippingInfo')):{}
}
}

const middleware =  [thunk];

const store = createStore(reducer,intialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;