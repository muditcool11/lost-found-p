import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { allFoundItems, allLostItems, deleteFoundItem, deleteLostItemTicket, resolveLostItem} from '../../services/ItemService';
import Footer from '../User/Footer'
import NavbarAdmin from './NavbarAdmin'

export default function ManageItems() {
  const navigate = useNavigate();
    //const [adminid, setAdminid] = useState('');
    //const [username, setUsername]= useState('');
    const [lostItemList,setLostItemList] = useState([]);
    const [foundItemList,setFoundItemList] = useState([]);

    useEffect(()=>{
        let id = localStorage.getItem("adminid");
       // let uname = localStorage.getItem("username");
        if(!id)
        {
          navigate("/adminlogin");
        }
        else
        {
            //setAdminid(id);
            //setUsername(uname);
            getAllLostItem();
            getAllFoundItem();
        }
      },[navigate]);

      async function getAllLostItem()
      {
        const lostitems = await allLostItems();
        setLostItemList(lostitems.data);
      }
      async function getAllFoundItem()
      {
        const founditems = await allFoundItems();
        setFoundItemList(founditems.data);
      }
    
      async function deleteLostItemById(itemId)
        {
            //console.log("inside deleteLostitembyid");
          try{
            await deleteLostItemTicket(itemId);
            toast.success("Item delete successful");
            getAllLostItem();
    
          }catch(err)
          {
            toast.error("Some error occured");
          }
        }
        async function resolveLostItemTicket(itemid)
        {
          try{
            await resolveLostItem(itemid);
            toast.success("Ticket resolved!");
            getAllLostItem();
          }catch(error){
            toast.error("Some error occured");
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

  return (
    <div>
       <ToastContainer/>
      <NavbarAdmin/>

      <h3 className='text-center my-3'>All Lost Items Tickets</h3>
      <div className="container table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Item ID</th>
              <th scope="col">Reporting User Id</th>
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
                    <td>{lostItem.user_id}</td>
                    <td>{lostItem.title}</td>
                    <td>{lostItem.category}</td>
                    <td>{lostItem.date.slice(0,10)}</td>
                    <td>{lostItem.location}</td>
                    <td>{lostItem.description}</td>
                    <td>{lostItem.status}</td>
                    <td><button className={`btn btn-success ${lostItem.status==='Resolved'?'disabled':''}`} onClick={() => resolveLostItemTicket(lostItem.id)} type="button">Resolve</button></td>
                    <td><button className='btn btn-danger' onClick={() => deleteLostItemById(lostItem.id)} type="button">Delete</button></td>
                  </tr>
              )
            }
          </tbody>
        </table>
      </div>

      <hr />

      <h3 className='text-center my-3'>All Found Items</h3>
      <div className="container table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Item ID</th>
              <th scope="col">Reporting User Id</th>
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
                    <td>{foundItem.user_id}</td>
                    <td>{foundItem.title}</td>
                    <td>{foundItem.category}</td>
                    <td>{foundItem.date.slice(0,10)}</td>
                    <td>{foundItem.location}</td>
                    <td>{foundItem.description}</td>
                    <td style={{color:`${foundItem.status==='Unclaimed'? "red": "green"}`}}>{foundItem.status}</td>
                    <td><button className='btn btn-danger' onClick={() => deleteFoundItemById(foundItem.id)} type="button">Delete</button></td>
                  </tr>
              )
            }
          </tbody>
        </table>
      </div>



      <Footer/>
    </div>
  )
}
