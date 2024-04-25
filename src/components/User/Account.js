import React ,{useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Footer from './Footer'
import Navbar from './Navbar'
import "react-toastify/dist/ReactToastify.css";
import { updateUserData } from '../../services/ItemService';

export default function Account() {
    const navigate = useNavigate();
    const [user_id, setUser_id] = useState('');
    const [user_email, setUser_email]= useState('');
    const [user_fullname, setUser_fullname]= useState('');
    const [newpassword, setNewpassword] = useState('');

    function handleFullname(e){setUser_fullname(e.target.value);}
    function handleEmail(e){setUser_email(e.target.value);}
    function handleNewpassword(e){setNewpassword(e.target.value || '');}
   

    useEffect(()=>{
      setUser_id(localStorage.getItem("userid"));
      setUser_email(localStorage.getItem("email"));
      setUser_fullname(localStorage.getItem("name"));
    },[]);

    useEffect(()=>{
      let id = localStorage.getItem("userid");
      if(!id)
      {
        navigate("/login");
      }
    },[navigate]);

    
    async function updateData(ee)
    {

        ee.preventDefault();
        const UserData = {
            "fullname":user_fullname,
           "password": newpassword!==''? newpassword : null,
            "email" :user_email
         }
         try{
         const updateDataResponse = await updateUserData(user_id,UserData);
         console.log(updateDataResponse.data);
         toast.success("User details updated");
         }catch(err)
         {
            toast.error("Some error occured");
         }

    }


  return (
    <div>
        <ToastContainer/>
      <Navbar/>

      <div>
    <section className=" py-3 py-md-5">
    <div className="container">
        <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
            <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="text-center mb-3">
                <h3>Update Item</h3>
                <hr />
                </div>
                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Update your found item details and save to update in database</h2>
                <form onSubmit={updateData}>
                <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name="fullName" id="fullName" value={user_fullname} onChange={handleFullname} placeholder="Full Name" />
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                    </div>
                    </div>
                    {/* <div className="col-12">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name="userName" id="userName" value={username} onChange={handleUsername} placeholder="User Name" disabled={true} />
                        <label htmlFor="userName" className="form-label">User Name</label>
                    </div>
                    </div> */}
                    <div className="col-12">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" name="email" id="email" value={user_email} onChange={handleEmail} placeholder="name@example.com"/>
                        <label htmlFor="email" className="form-label">Email</label>
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" name="password" id="password" onChange={handleNewpassword} placeholder="Type New Password" />
                        <label htmlFor="password" className="form-label">New Password</label>
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="d-grid my-3">
                        <button className="btn btn-primary btn-lg" type="submit">Update</button>
                    </div>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
    </div>

      <Footer/>
    </div>
  )
}
