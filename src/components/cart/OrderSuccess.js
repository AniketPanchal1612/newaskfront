import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
const OrderSuccess = () => {

  return (
    <Fragment>
        <MetaData title={'Order Success'} />
        <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center" >
                <img style={{width:'200px'}} className="my-5 img-fluid d-block mx-auto" src="https://freepngimg.com/thumb/success/6-2-success-png-image.png" alt="Order Success" width="150" height="150" />

                <h2 className='mb-5'>Your Order has been placed successfully.</h2>
                <div className='mb-5'>

                <Link to="/orders/me" style={{color:'blue',fontWeight:'600'}}>Go to Orders</Link>
                </div>
                
            </div>

        </div>

    </Fragment>
  )
}

export default OrderSuccess
