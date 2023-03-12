import React, { Fragment } from 'react'
import { Route,Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import { render } from 'react-dom'

const ProtectedRoute = ({isAdmin,component:Component,...res}) => {
    const alert = useAlert()
    const {isAuthenticated, loading,user} = useSelector(state=>state.auth)
    return (
    <Fragment>
        {loading === false && (
          <Route {...res}
            render = {props=>{
              if(isAuthenticated===false) {
                alert.show('Please login first to access this resource')
                return <Redirect to='/login' />
              }
              if(isAdmin===true && user.role !=='admin') {
                return <Redirect to="/" />
              }

              return <Component {...props} />
            }
            }
          />
        )}
    </Fragment>
  )
}

export default ProtectedRoute
