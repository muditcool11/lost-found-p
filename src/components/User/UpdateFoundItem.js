import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import Footer from './Footer';
import Navbar from './Navbar';
import { itemDetails, updateItemService } from '../../services/ItemService';

export default function UpdateFoundItem() {

    const {itemid} = useParams();
    const navigate = useNavigate();
    const [title,setTitle]=useState('');
    const [category,setCategory] = useState('');
    const [reportDate, setReportDate] =useState('');
    const [location,setLocation] = useState('');
    const [description,setDescription]=useState('');
    const itemtype= 'Found';
    const [status, setStatus] = useState('');
    // const [user_id,setUser_id] = useState('');

    function handleTitle(e){setTitle(e.target.value);}
    function handleCategory(e){setCategory(e.target.value);}
    function handleReportDate(e){setReportDate(e.target.value);}
    function handleLocation(e){setLocation(e.target.value);}
    function handleDescription(e){setDescription(e.target.value);}

    useEffect(()=>{
        let uid = localStorage.getItem("userid");
        if(!uid)
        {
            navigate("/login");
        }
    },[navigate])

    useEffect(()=>{
        async function getitemdata(){
        const itemObj = await itemDetails(itemid);
        console.log(itemObj);
        setTitle(itemObj.data.title);
        setCategory(itemObj.data.category);
        setDescription(itemObj.data.description);
        setLocation(itemObj.data.location);
        setReportDate(itemObj.data.date.slice(0,10));
        setStatus(itemObj.data.status);
    }
    getitemdata();
},[itemid]);

    async function updateData(e){
        e.preventDefault();
        const itemObj = {
            title: title,
            type: itemtype,
            category: category,
            description: description,
            date: reportDate,
            status: status,
            location: location,
            user_id: localStorage.getItem("userid")
        }

        try{
            const repsonseData = await updateItemService(itemid,itemObj);
        console.log(repsonseData.data);
        toast.success("Update Successful");
        setTimeout(()=>{
            navigate("/reportItem");
          },2000);
        }catch(error){
            console.log(error);
            toast.error("Some error occured");
        }
        
    }
  return (
    <div>
         <ToastContainer/>
      <Navbar/>

      <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card border border-light-subtle rounded-3 shadow-sm">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="text-center mb-3">
                                    <h3>Update Found Item</h3>
                                    <hr />
                                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Update the found item details.</h2>
                                    <form onSubmit={updateData}>
                                        <div className="row gy-2 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control" name="title" id="title" value={title} onChange={handleTitle} placeholder="Title" required={true} />
                                                    <label htmlFor="title" className="form-label">Title</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <select className="form-select" id='category' value={category} onChange={handleCategory} required={true}>
                                                        <option defaultValue={category} >Select Item Category</option>
                                                        <option value="Mobile">Mobile</option>
                                                        <option value="Electronics">Electronics</option>
                                                        <option value="Clothing">Clothing</option>
                                                        <option value="Bag">Bag</option>
                                                        <option value="Book">Book</option>
                                                        <option value="Others">Others</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="date" className="form-control" name="date" value={reportDate} onChange={handleReportDate} id="date" required={true} />
                                                    <label htmlFor="date" className="form-label">Date</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control" name="location" id="location" value={location} onChange={handleLocation} placeholder="Location" required={true} />
                                                    <label htmlFor="location" className="form-label">Location</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <textarea type="text" className="form-control" name="description" id="description" value={description} onChange={handleDescription} placeholder="Description" required={true} />
                                                    <label htmlFor="description" className="form-label">Description</label>
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
                
            </div>
      <Footer/>
    </div>
  )
}
