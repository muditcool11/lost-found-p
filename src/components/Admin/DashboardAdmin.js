import React, { useState , useEffect} from 'react'
import userlogo from '../../image/user-solid.svg'
import itemlogo from '../../image/box-archive-solid.svg'
import claimlogo from '../../image/file-pen-solid.svg'
import NavbarAdmin from './NavbarAdmin'
import Footer from '../User/Footer'
import { ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'



export default function DashboardAdmin() {

    const navigate = useNavigate();
    //const [adminid, setAdminid] = useState('');
    const [username, setUsername]= useState('');

    useEffect(()=>{
        let id = localStorage.getItem("adminid");
        let uname = localStorage.getItem("username");
        if(!id)
        {
          navigate("/adminlogin");
        }
        else
        {
            //setAdminid(id);
            setUsername(uname);
        }
      },[navigate]);


    return (
        <div>
            <ToastContainer/>
            <NavbarAdmin />
            <div className="col-12 py-3 ">
            <h4>Admin Dashboard</h4>
            <div className="col-6 py-3"><h5>Welcome , {username}</h5></div>
          </div>
            <div className="container py-3">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12 col-md-6 my-3">

                        <div className="card justify-content-center" style={{width: "18rem"}}>
                            <img src={userlogo} className="card-img-top py-3"  style={{width: "18rem", height: "5rem"}} alt="user_logo"/>
                                <div className="card-body">
                                    <h5 className="card-title">Users</h5>
                                    <p className="card-text">Manage all the users in the database.</p>
                                    <Link to="/manageUsers" className="btn btn-primary">Manage</Link>
                                </div>
                        </div>

                    </div>
                    <div className="col-lg-4 col-sm-12 col-md-6 my-3">

                        <div className="card" style={{width: "18rem"}}>
                            <img src={itemlogo} className="card-img-top py-3" style={{width: "18rem", height: "5rem"}} alt="item_logo"/>
                                <div className="card-body">
                                    <h5 className="card-title">Items</h5>
                                    <p className="card-text">Manage items either lost or found in the database.</p>
                                    <Link to="/manageItems" className="btn btn-primary">Manage</Link>
                                </div>
                        </div>

                    </div>
                    <div className="col-lg-4 col-sm-12 col-md-6 my-3">

                        <div className="card" style={{width: "18rem"}}>
                            <img src={claimlogo} className="card-img-top py-3" style={{width: "18rem", height: "5rem"}} alt="claim_logo"/>
                                <div className="card-body">
                                    <h5 className="card-title">Claims</h5>
                                    <p className="card-text">Manage all the claims made by users.</p>
                                    <Link to="/manageClaims" className="btn btn-primary">Manage</Link>
                                </div>
                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </div>
    )
}
