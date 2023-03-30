import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layout/Footer/Footer";
import Header from './components/layout/Header/Header'
import Shop from './components/Shop'
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductDetail from "./components/products/ProductDetail";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { loadUser } from "./actions/authAction";
import store from './store'
import { useEffect } from "react";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrder from "./components/order/ListOrder";
import OrderDetails from "./components/order/OrderDetails";
import ConfirmOrderYes from "./components/cart/ConfirmOrderYes";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import About from "./components/About";
import ScrollTop from "./components/ScrollTop";
import { LOAD_USER_SUCCESS } from "./constants/AuthConstant";
import { useDispatch } from "react-redux";
// import ListReview from "./components/review/ListReview";
function App() {
  useEffect(()=>{
    
    // store.dispatch(loadUser());
    loadUser();
  },[])

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // Dispatch the loadUser action when the component mounts and on page reload
  //   dispatch(loadUser());
  // }, [dispatch]);
  return <Router>

    <Header />
    <ScrollTop />
    {/* <div className="container container-fluid"> */}

    <Route path='/' component={Home} exact />
    <Route path='/shop' component={Shop} exact />
    <Route path='/search/:keyword' component={Shop} />
    
    <Route path='/product/:id' component={ProductDetail} exact />
    <Route path='/cart' component={Cart} exact />


    <Route path='/login' component={Login} exact />
    <Route path='/password/forgot' component={ForgotPassword} exact />
    <Route path='/password/reset/:token' component={NewPassword} exact />
    <Route path='/register' component={Register} exact />
    <Route path='/aboutus' component={About} exact />
    <ProtectedRoute path='/me' component={Profile}exact/>
    <ProtectedRoute path='/shipping' component={Shipping}exact/>
    <ProtectedRoute path='/order/confirm/confirm' component={ConfirmOrder}exact/>
    <ProtectedRoute path='/confirm/final' component={ConfirmOrderYes}exact/>
    <ProtectedRoute path='/success' component={OrderSuccess}exact/>
    <ProtectedRoute path='/me/update' component={UpdateProfile} exact />
    <ProtectedRoute path='/password/update' component={UpdatePassword} exact />
    <ProtectedRoute path='/orders/me' component={ListOrder} exact />
    <ProtectedRoute path='/order/:id' component={OrderDetails} exact />
    <ProtectedRoute path='/dashboard' isAdmin={true} component={Dashboard} exact />
    <ProtectedRoute path='/admin/products' isAdmin={true} component={ProductList} exact />
    <ProtectedRoute path='/admin/product' isAdmin={true} component={NewProduct} exact />
    <ProtectedRoute path='/admin/product/:id' isAdmin={true} component={UpdateProduct} exact />
    <ProtectedRoute path='/admin/orders' isAdmin={true} component={OrdersList} exact />
    <ProtectedRoute path='/admin/order/:id' isAdmin={true} component={ProcessOrder} exact />
    <ProtectedRoute path='/admin/user/:id' isAdmin={true} component={UpdateUser} exact />
    <ProtectedRoute path='/admin/users' isAdmin={true} component={UsersList} exact />
    <ProtectedRoute path='/admin/reviews' isAdmin={true} component={ProductReviews} exact />
    {/* </div> */}
    <Footer />
  </Router>;
}

export default App;
