import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { ClearErrors, forgotPassword} from '../../actions/authAction';
import MetaData from '../layout/MetaData';
import { UPDATE_PASSWORD_RESET } from '../../constants/AuthConstant';
import "./Register.css"

const ForgotPassword = () => {
  
    const [email, setEmail] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch()

    // const { user } = useSelector(state => state.auth)
    const { error, message,loading } = useSelector(state => state.forgotPassword)
    useEffect(() => {

        if (error) {
            // console.log(error)
            alert.error(error)
            dispatch(ClearErrors())
        }
        if (message) {
            alert.success(message)      
        }
    }, [dispatch, , error, alert, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData;
        formData.set('email', email);


        dispatch(forgotPassword(formData))
    }

  return (
    <Fragment>
        <MetaData title={"Forgot Password"} />
        <div className="row wrapper mb-4 mt-4">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                name='email'
                                onChange={(e)=>setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading? true:false}>
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
    </Fragment>
  )
}

export default ForgotPassword
