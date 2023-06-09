import React, { Fragment, useEffect } from 'react'
import {useAlert} from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { ClearErrors, getAdminProducts } from '../../actions/productAction'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
// import { DELETE_PRODUCT_RESET } from '../../constants/ProductConstant'
import { allOrders } from '../../actions/orderAction'
import { allUsers, deleteUser } from '../../actions/authAction'
import { DELETE_USERS_RESET } from '../../constants/AuthConstant'
const UsersList = ({history}) => {
 
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, users, error } = useSelector(state => state.allUsers)
    const {isDeleted} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers())

        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }

        if (isDeleted) {
            alert.success('User deleted successfully');
            history.push('/admin/users');
            dispatch({ type: DELETE_USERS_RESET })
        }


    }, [dispatch, alert, error, isDeleted,history])

    const deleteUserHandler =(id)=>{
        dispatch(deleteUser(id))
    }
    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
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
        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

                actions: <Fragment>
                    <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=>deleteUserHandler(user._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }
    return (
        <Fragment>
        <MetaData title={'All Users'} />
        <div className="row">
            <div className="col-12 col-md-2">
                <SideBar />
            </div>

            <div className="col-12 col-md-10">
                <Fragment>
                    <h1 className="my-5">All Users</h1>

                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setUsers()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                    )}

                </Fragment>
            </div>
        </div>

    </Fragment>
  )
}


export default UsersList
