import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { ClearErrors, register } from '../../actions/authAction';
import MetaData from '../layout/MetaData';


import './Register.css'
import Logo from '../../assets/images/user-icon.png'
const Register = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading, success } = useSelector(state => state.auth)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState('')

    const [avatarPreview, setAvatarPreview] = useState(Logo)



    useEffect(() => {
        if (isAuthenticated) {
            // alert.success("Login successfully")
            history.push('/')
        }
        if (success) {
            alert.success("Register successfully");
        }
        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }

    }, [dispatch, error, alert, isAuthenticated, history, success])
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData))
    }
    const onChange = e => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }
    return (
        <Fragment>
            <MetaData title={'Register User'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input type="name" id="name_field" className="form-control"
                                name='name'
                                value={name}
                                onChange={onChange}
                                required

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                name='email'
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                name='password'
                                onChange={onChange}
                                required

                            />
                            <span style={{ color: 'red', fontSize: '10px' }}>{password.length < 6 ? "Please enter 6 char long password" : ""}</span>

                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center avatar__div'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}

                                            className='rounded-circle'
                                            alt='image'

                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='images/*'
                                        onChange={onChange}
                                        required

                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* {
                            loading ?

                                <button
                                    id="register_button"
                                    type="submit"
                                    // style={{height:"50px"}}
                                    className="btn btn-block py-4"
                                    disabled={loading ? true : false}

                                >
                                    {/* <Loader /> */}
                                    {/* <spa style={{fontSize:"10px", disabled:true}}>Please Wait...</spa> */}
                                    {/* <div className='loaderr' ></div>

                                </button> : */}


                        {/* } */}
                                <button
                                    id="register_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                // disabled={loading ? true : false}
                                >

                                    REGISTER
                                </button>
                        
                        
                        
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Register
