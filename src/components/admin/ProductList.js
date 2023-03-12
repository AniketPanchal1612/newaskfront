import React, { Fragment, useEffect } from 'react'
import {useAlert} from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { ClearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
import { DELETE_PRODUCT_RESET } from '../../constants/ProductConstant'
const ProductList = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, products, error} = useSelector(state => state.products)
    const {error:deleteError, isDeleted}= useSelector(state=>state.product) 
    // console.log(products)



    useEffect(() => {
        dispatch(getAdminProducts())

        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(ClearErrors())
        }
        // console.log(isDeleted)
        if (isDeleted) {
            alert.success('Product deleted successfully');
            history.push('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }


    }, [dispatch, alert, error, history,isDeleted,deleteError])
    const setProducts = () => {
        const data = {
            columns: [
                
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
                
            ],
            rows: []
        }

        // console.log(products)
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `Rs. ${product.price}`,
                stock: product.stock,
                actions: <Fragment style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
                   

                    <Link to={`/admin/product/${product._id}`}  style={{marginRight: '0.5rem'}} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=>deleteProductHandler(product._id)}>
                        <i className="fa fa-trash" ></i>
                    </button>
                </Fragment>
            })

        })
        return data;

    }
    const deleteProductHandler=(id)=>{
        dispatch(deleteProduct(id))
    }
  return (
    <Fragment>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>

                <div className="col-12 col-md-10" style={{width:'80%'}}>
                    <Fragment >
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable 
                                data={setProducts()}
                                // className="mx-0"
                                bordered
                                striped
                                hover
                                responsive small
                                
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
  )
}

export default ProductList
