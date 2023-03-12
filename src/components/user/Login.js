import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { ClearErrors, login } from '../../actions/authAction';
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';
import './Login.css'
const Login = ({ history, location }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, error, loading, success } = useSelector(state => state.auth)

  const redirect = location.search ? location.search.split("=")[1] : '/'
  useEffect(() => {
    if (isAuthenticated) {
      // alert.success("Login successfully")
      history.push(redirect)
    }
    if (success) {
      alert.success("Login successfully");
    }
    if (error) {
      alert.error(error);
      dispatch(ClearErrors())
    }

  }, [dispatch, error, alert, isAuthenticated, history, success])
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }
  return (
    <Fragment>
      {/* {loading ? <Loader /> : ( */}
        <Fragment>
          <MetaData title={'Login'} />

          <div className="row wrapper mb-5">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to='/password/forgot' className="float-right mb-4">Forgot Password?</Link>

                {/* {loading ? */}
                  {/* <button
                    id="login_button"
                    type="submit"
                    // style={{height:"50px"}}
                    className="btn btn-block py-4"
                    disabled={loading ? true : false}

                  > */}
                    {/* <Loader /> */}
                    {/* <spa style={{fontSize:"10px", disabled:true}}>Please Wait...</spa> */}
                    {/* <div className='loaderr' ></div>

                  </button> : */}
                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block"
                  >
                    LOGIN
                  </button>
                {/* } */}

                <Link to="/register" className="float-right mt-3">New User?</Link>
              </form>
            </div>
          </div>


        </Fragment>


      {/* )} */}

    </Fragment>
  )
}

export default Login
