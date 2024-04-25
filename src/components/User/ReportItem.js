import React ,{useState,useEffect }from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer , toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { deleteFoundItem, getFoundItemsForUser, reportFoundItem } from '../../services/ItemService'
import Footer from './Footer'
import Navbar from './Navbar'

export default function ReportItem() {
    const navigate = useNavigate();
    const [title,setTitle]=useState('');
    const [category,setCategory] = useState('');
    const [reportDate, setReportDate] =useState('');
    const [location,setLocation] = useState('');
    const [description,setDescription]=useState('');
    const [user_id,setUser_id] = useState('');

    const [foundItemList, setFoundItemList] = useState([]);
    //const [user_email,setUser_email] = useState('');
    let currentDate = new Date().toISOString().split('T')[0];


    function handleTitle(e){setTitle(e.target.value);}
    function handleCategory(e){setCategory(e.target.value);}
    function handleReportDate(e){setReportDate(e.target.value);}
    function handleLocation(e){setLocation(e.target.value);}
    function handleDescription(e){setDescription(e.target.value);}

    useEffect(()=>{
        
        //setUser_email(localStorage.getItem("email"));
        getAllFoundItem();
      });

    useEffect(()=>{
        let id = localStorage.getItem("userid");
        if(!id)
        {
          navigate("/login");
        }else{
            setUser_id(localStorage.getItem("userid"));
        }
      },[navigate]);

     async function saveReport(e)
      {
        e.preventDefault();
        const Item = {
            "title": title,
            "category": category,
            "date": reportDate,
            "location": location,
            "description": description,
            "user_id": user_id
        }
        // console.log(reportDate,"  :  ",currentDate);
        if(Item.category==='' || Item.category==='Select Item Category')
        {
            toast.error("Please select a category");
        }
        else if(reportDate>currentDate){
            toast.error("Date cannot be greater than today");

        }
        else{
            console.log(Item);
            const reportItemResponse = await reportFoundItem(Item);
            toast.success("Item Reported Successfully. Please submit the item to admin.");
            console.log(reportItemResponse.data);
        }
        
      }

      async function deleteFoundItemById(itemId)
        {
            console.log("inside deleteFounditembyid");
          try{
            await deleteFoundItem(itemId);
            toast.success("Item delete successful");
            getAllFoundItem();
    
          }catch(err)
          {
            toast.error("Some error occured");
          }
        }

        async function updateFoundItemById(itemId)
        {
            navigate(`/update_founditem/${itemId}`);
        }

        async function getAllFoundItem()
      {
        const founditems = await getFoundItemsForUser(localStorage.getItem("userid"));
        setFoundItemList(founditems.data);
      }




    return (
        <div>
            <ToastContainer/>
            <Navbar />

            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card border border-light-subtle rounded-3 shadow-sm">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="text-center mb-3">
                                    <h3>Report Found Item</h3>
                                    <hr />
                                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Fill the form to report the found item and submit it to the admin office after reporting.</h2>
                                    <form onSubmit={saveReport}>
                                        <div className="row gy-2 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control" name="title" id="title" value={title} onChange={handleTitle} placeholder="Title" required={true} />
                                                    <label htmlFor="title" className="form-label">Title</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    {/* <input type="text" className="form-control" name="category" id="category" placeholder="Category" required /> */}
                                                    {/* <label htmlFor="category" className="form-label">Category</label> */}
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
                                                    <button className="btn btn-primary btn-lg" type="submit">Submit Report</button>
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


            <h3 className='text-center my-3'>User Reported Items</h3>
      <div className="container table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Item ID</th>
              {/* <th scope="col">Reporting User Id</th> */}
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Date</th>
              <th scope="col">Location</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              foundItemList.map(
                foundItem =>

                  <tr key={foundItem.id}>
                    <td>{foundItem.id}</td>
                    {/* <td>{foundItem.user_id}</td> */}
                    <td>{foundItem.title}</td>
                    <td>{foundItem.category}</td>
                    <td>{foundItem.date.slice(0,10)}</td>
                    <td>{foundItem.location}</td>
                    <td>{foundItem.description}</td>
                    <td style={{color:`${foundItem.status==='Unclaimed'? "red": "green"}`}}>{foundItem.status}</td>
                    <td><button className={`btn btn-primary ${foundItem.status==='Claimed'? 'disabled':''}`} onClick={() => updateFoundItemById(foundItem.id)} type="button">Update</button></td>
                    <td><button className={`btn btn-danger ${foundItem.status==='Claimed'? 'disabled':''}`} onClick={() => deleteFoundItemById(foundItem.id)} type="button">Delete</button></td>
                  </tr>
              )
            }
          </tbody>
        </table>
      </div>
            <Footer />
        </div>
    )
}
