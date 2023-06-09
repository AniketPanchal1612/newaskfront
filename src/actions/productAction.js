import axios from 'axios';
import { ADMIN_PRODUCTS_FAIL, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, GET_REVIEW_FAIL, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from '../constants/ProductConstant';
import { BASE_URL } from '../helper';


export const getProducts=(keyword='',currentPage=1,price,category)=>async(dispatch)=>{
    try {
        dispatch({type: ALL_PRODUCTS_REQUEST})
        let link =`${BASE_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}`
        if(category){
            link =`${BASE_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}`
            }
        // const {data} = await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}`);
        const {data} = await axios.get(link);
            console.log(data)
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data})
    } catch (error) {
        dispatch({
            type:ALL_PRODUCTS_FAIL,
            payload:error.response.data.message
        })
    }
}



export const getProductDetail =(id)=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAIL_REQUEST})
        const {data} = await axios.get(`${BASE_URL}/api/v1/product/${id}`)
        dispatch({type:PRODUCT_DETAIL_SUCCESS,payload:data.product})
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message
        })   
    }
}

export const newReview = (reviewData) => async (dispatch) =>{
    try {
        dispatch({type:NEW_REVIEW_REQUEST})

        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        //pull data
        const {data} = await axios.put(`${BASE_URL}/api/v1/review`, reviewData,config)

        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type:NEW_REVIEW_FAIL ,
            payload: error.response.data.message
        })
        
    }
}



export const getAdminProducts = () => async (dispatch) =>{
    try {
        dispatch({type:ADMIN_PRODUCTS_REQUEST})

        //pull data
        const {data} = await axios.get(`${BASE_URL}/api/v1/admin/products`)

        dispatch({
            type:ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })
        
    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({
            type:ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
        
    }
}


export const newProduct = (productData) => async (dispatch) => {
    try {
        console.log("object")

        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`${BASE_URL}/api/v1/admin/product/new`, productData, config)
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


//DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch) =>{
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST})

        
        //pull data
        const {data} = await axios.delete(`${BASE_URL}/api/v1/admin/product/${id}`)

        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
        
    }
}

export const updateProduct = (id,productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`${BASE_URL}/api/v1/admin/product/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


//get product review
export const getProductReviews = (id) => async (dispatch) =>{
    try {
        dispatch({type:GET_REVIEW_REQUEST})

        //pull data
        const {data} = await axios.get(`${BASE_URL}/api/v1/review?id=${id}`)

        dispatch({
            type:GET_REVIEW_SUCCESS,
            payload: data.reviews
        })
        
    } catch (error) {
        dispatch({
            type:GET_REVIEW_FAIL,
            payload: error.response.data.message
        })
        
    }
}

//delete product review
export const deleteReviews = (id, productId) => async (dispatch) =>{
    try {
        dispatch({type:DELETE_REVIEW_REQUEST})

        //pull data
        const {data} = await axios.delete(`${BASE_URL}/api/v1/review?id=${id}&productId=${productId}`)

        dispatch({ 
            type:DELETE_REVIEW_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type:DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
        
    }
}

export const ClearErrors =()=> async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}