import React , {useState,useEffect} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { deleteLostItemTicket, getLostItemsForUser, raiseLostTicket} from '../../services/ItemService';
export default function LostTicket() {

    const navigate = useNavigate();
    const [title,setTitle]=useState('');
    const [category,setCategory] = useState('');
    const [lostDate, setLostDate] =useState('');
    const [location,setLocation] = useState('');
    const [description,setDescription]=useState('');
    const [user_id,setUser_id] = useState('');
    //const [user_email,setUser_email] = useState('');
    const [lostItemList, setLostItemList] = useState([]);
    let currentDate = new Date().toISOString().split('T')[0];


    function handleTitle(e){setTitle(e.target.value);}
    function handleCategory(e){setCategory(e.target.value);}
    function handleLostDate(e){setLostDate(e.target.value);}
    function handleLocation(e){setLocation(e.target.value);}
    function handleDescription(e){setDescription(e.target.value);}

    useEffect(()=>{
        setUser_id(localStorage.getItem("userid"));
        //setUser_email(localStorage.getItem("email"));
        getAllLostItem();
      },[]);

    useEffect(()=>{
        let id = localStorage.getItem("userid");
        if(!id)
        {
          navigate("/login");
        }
      },[navigate]);

     async function raiseTicket(e)
      {
        e.preventDefault();
        const Item = {
            "title": title,
            "category": category,
            "date": lostDate,
            "location": location,
            "description": description,
            "user_id": user_id
        }
        if(Item.category==='' || Item.category==='Select Item Category')
        {
            toast.error("Please select a category");
        }
        else if(lostDate>currentDate){
            toast.error("Date cannot be greater than today");

        }
        else{
            console.log(Item);
            const lostItemResponse = await raiseLostTicket(Item);
            toast.success("Lost Ticket Raised. Admin will begin search for your item now.");
            console.log(lostItemResponse.data);
        }
        
      }

      async function deleteLostItemById(itemId)
        {
            console.log("inside deleteLostitembyid");
          try{
            await deleteLostItemTicket(itemId);
            toast.success("Item delete successful");
            getAllLostItem();
    
          }catch(err)
          {
            toast.error("Some error occured");
          }
        }

        async function updateLostItemById(itemId)
        {
            navigate(`/update_lostitem/${itemId}`);
        }

        async function getAllLostItem()
      {
        const lostitems = await getLostItemsForUser(localStorage.getItem("userid"));
        console.log(lostitems.data);
        setLostItemList(lostitems.data);
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
                                    <h3>Raise Lost Item Ticket</h3>
                                    <hr />
                                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Fill the form to raise a lost item ticket.</h2>
                                    <form onSubmit={raiseTicket}>
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
                                                    <select className="form-select" value={category} onChange={handleCategory} required={true}>
                                                        <option defaultValue={category}>Select Item Category</option>
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
                                                    <input type="date" className="form-control" name="date" value={lostDate} onChange={handleLostDate} id="date" required={true} />
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
                                                    <button className="btn btn-primary btn-lg" type="submit">Submit Ticket</button>
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


            <h3 className='text-center my-3'>User Lost Tickets</h3>
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
              lostItemList.map(
                lostItem =>

                  <tr key={lostItem.id}>
                    <td>{lostItem.id}</td>
                    {/* <td>{lostItem.user_id}</td> */}
                    <td>{lostItem.title}</td>
                    <td>{lostItem.category}</td>
                    <td>{lostItem.date.slice(0,10)}</td>
                    <td>{lostItem.location}</td>
                    <td>{lostItem.description}</td>
                    <td style={{color:`${lostItem.status==='Missing'? "red": "green"}`}}>{lostItem.status}</td>
                    <td><button className={`btn btn-primary ${lostItem.status==='Resolved'? 'disabled':''}`} onClick={() => updateLostItemById(lostItem.id)} type="button">Update</button></td>
                    <td><button className={`btn btn-danger ${lostItem.status==='Resolved'? 'disabled':''}`} onClick={() => deleteLostItemById(lostItem.id)} type="button">Delete</button></td>
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
