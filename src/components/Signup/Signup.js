import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userexists, usernameAvailable, userSignup } from '../../services/ItemService';
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 


export default function Signup() {
    const navigator = useNavigate();
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleFullname(e){setFullname(e.target.value);}
    function handleUsername(e){setUsername(e.target.value);}
    function handleEmail(e){setEmail(e.target.value);}
    function handlePassword(e){setPassword(e.target.value);}

   

    function saveUser(e)
    {
        e.preventDefault();
        const User = {fullname,username,email,password};
        //console.log(User);
        userexists(User.email).then((res)=>{
            if(res.data)
            {
                toast.info("User Already exist")
            }
            else
            {
                usernameAvailable(User.username).then((res)=>{
                    //console.log(res.data.id);
                    if(res.data.id!=null)
                    {
                        toast.error("Username Taken");
                       
                    }
                    else
                    {
                        userSignup(User).then((res)=>{
                            //console.log(res.data);
                            setTimeout(()=>{
                                toast.success("User created successfully")
                            },2000);
                            navigator("/login");
                        }).catch((error)=>{
                            if(error.response)
                            {
                                toast.error("Some error occured");
                                //console.log(error);
                            }
                        }) 
                    }
                })
            }
        });
    }





  return (
    
    <div>
    <ToastContainer/>
    <section className="bg-light py-3 py-md-5">
    <div className="container">
        <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
            <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="text-center mb-3">
                <h3>Lost and Found Portal</h3>
                <hr />
                <h4>SignUp</h4>
                </div>
                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
                <form onSubmit={saveUser}>
                <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name="fullName" id="fullName" value={fullname} onChange={handleFullname} placeholder="Full Name" required={true}/>
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name="userName" id="userName" value={username} onChange={handleUsername} placeholder="User Name" required={true}/>
                        <label htmlFor="userName" className="form-label">User Name</label>
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" name="email" id="email" value={email} onChange={handleEmail} placeholder="name@example.com" required={true}/>
                        <label htmlFor="email" className="form-label">Email</label>
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" name="password" id="password" value={password} onChange={handlePassword} placeholder="Password" required={true}/>
                        <label htmlFor="password" className="form-label">Password</label>
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="d-grid my-3">
                        <button className="btn btn-primary btn-lg" type="submit">Sign up</button>
                    </div>
                    </div>
                    <div className="col-12">
                    <p className="m-0 text-secondary text-center">Already have an account? <Link to="/login" className="link-primary text-decoration-none">Sign in</Link></p>
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
  )
}
