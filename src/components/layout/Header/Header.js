import React, { useEffect, useRef } from 'react'
import logo from './logo1.png'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux'
import userIcon from '../../../assets/images/user-icon.png'
// import {NavLink} from 'react-router-dom'
import { motion } from 'framer-motion'
import { Route, Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Row, Container } from 'reactstrap'
import { logout } from '../../../actions/authAction'
const nav__link = [
  {
    path: 'home',
    display: 'Home'
  },
  {
    path: 'shop',
    display: 'Shop'
  },
  {
    path: 'cart',
    display: 'Cart'
  },
  {
    path: 'about',
    display: 'About'
  },
]
const Header = () => {
  const headerRef = useRef(null);
  const alert = useAlert();
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state=>state.cart)
  const { user, loading } = useSelector(state => state.auth)
  const stickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const logoutHandler=()=>{
    dispatch(logout());
    alert.success("Logged out successfully")
  }
  const menuref = useRef(null);


  useEffect(() => {
    stickyHeader();

    return () => {
      window.removeEventListener("scroll", stickyHeader);
    };
  }, []);

  const menuToggle = () => menuref.current.classList.toggle('active__menu')
  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav__wrapper'>
            <div className='logo'>
              <Link to='/'>

                <img src={logo} alt="Logo" />
              </Link>
              <div>
                <h1 id='hearask' className='hearask'>ASK Furniture</h1>
                {/* <p>AAI SHREE KHODIYAR FURNITURE</p> */}
              </div>
            </div>
            <div className="navigation" ref={menuref} onClick={menuToggle}>
              <ul className='menu'>
                <li className='nav__item'>
                  <Link to='/'>Home</Link>
                  {/* Home */}
                </li>
                <li className='nav__item'>
                  {/* <a href='/shop'>Shop</a> */}
                  <Link to='/shop'>Shop</Link>
                </li>
                <li className='nav__item'>
                  <Link to='/cart'>Cart</Link>
                  {/* Cart */}
                </li>
                <li className='nav__item'>
                  <Link to='/aboutus'>About</Link>
                  {/* About */}
                </li>
              </ul>
            </div>
            <div className='nav__icons'>
              {/* <span className='fav__icon'><i className="ri-heart-line"></i>
                <span className='badge'>1</span>
              </span> */}
              {/* <motion.div whileHover={{scale:1.2}} > */}

              <Link to='/cart' style={{ textDecoration: 'none' }}>
                <span className='cart__icon'>
                  <i className="ri-shopping-bag-line"></i>
                  <span className='badge'>{cartItems.length}</span>
                </span>
              </Link>
              {/* </motion.div> */}
              {user ? (
                <div className='ml-1 dropdown d-inline'>
                  <Link to='#' style={{ color: 'black' }} className='btn dropdown-toggle mr-4 dtoggle' type='button' id='dropDownMenuButton' data-toggle="dropdown"
                    aria-haspopup='true' area-aria-expanded='false'>
                    <span style={{ color: 'black' }}>{user && user.name} </span>
                    
                    <span><motion.img className='rounded-circle' whileTap={{ scale: 1.2 }} whileHover={{ scale: 1.2 }} src={user.avatar && user.avatar.url} alt="" /></span>
                    {/* <figure className='avatar avtar-nav'>

                      <motion.img whileHover={{scale:1.2}}
                        src={user.avatar && user.avatar.url} alt='User'
                        className='rounded-circle'
                      />
                    </figure> */}
                  </Link>

                  <div
                    className='dropdown-menu'
                    aria-labelledby='dropDownMenuButton'
                  >
                    {user && user.role === 'admin' &&
                      (<Link className='dropdown-item'
                        to='/dashboard'>
                        Dashboard

                      </Link>)}

                    <Link className='dropdown-item'
                      to='/orders/me'
                    >Orders

                    </Link>
                    <Link className='dropdown-item'
                      to='/me'
                    >Profile

                    </Link>

                    <Link className='dropdown-item text-danger' to='/' onClick={logoutHandler}>
                      Logout
                    </Link>
                  </div>

                </div>

              ) :
                !loading && <Link to='/login' className="btn ml-4" id="login_btn">Login</Link >
              }

              {/* <span><motion.img whileTap={{ scale: 1.1 }} src={userIcon} alt="" /></span> */}
              <div className='mobile__menu' onClick={menuToggle}>
                <span><i className="ri-menu-line"></i></span>
              </div>
            </div>
          </div>

        </Row>
      </Container>

    </header>
  )
}

export default Header
