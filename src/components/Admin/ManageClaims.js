import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { allclaims, approveClaim, deleteClaim, itemDetails } from '../../services/ItemService';
import Footer from '../User/Footer'
import NavbarAdmin from './NavbarAdmin'


async function getItemTitle(itemId)
  {
    const ItemDetails = await itemDetails(itemId);
    console.log("Title  value:"+ItemDetails.data.title);
    return ItemDetails.data.title;
  }

export default function ManageClaims() {
  const navigate = useNavigate();
    //const [adminid, setAdminid] = useState('');
    //const [username, setUsername]= useState('');
    const [claimList,setClaimList] = useState([]);

    useEffect(()=>{
        let id = localStorage.getItem("adminid");
        //let uname = localStorage.getItem("username");
        if(!id)
        {
          navigate("/adminlogin");
        }
        else
        {
            //setAdminid(id);
            //setUsername(uname);
            getallclaim();
        }
      },[navigate]);


      async function getallclaim()
      {
        const datalist = await allclaims();
        console.log(datalist.data);
        setClaimList(datalist.data);
      }

      async function approveClaimById(claimId)
      {
        try{
          await approveClaim(claimId);
          toast.success("Claim approved successful");
          getallclaim();
        }catch(err)
        {
          toast.error("Some error occured");
        }
      }
    
        async function deleteClaimById(claimId)
        {
          try{
            await deleteClaim(claimId);
            toast.success("Claim delete successful");
            getallclaim();
    
          }catch(err)
          {
            toast.error("Some error occured");
          }
        }


  return (
    <div>
       <ToastContainer/>
      <NavbarAdmin/>

      <h3 className='text-center my-3'>All Claim Requests</h3>
       <div className="container table-responsive">
       <table className="table table-hover"> 
  <thead>
    <tr>
      <th scope="col">Claim ID</th>
      <th scope="col">Item ID</th>
      <th scope="col">User ID</th>
      <th scope="col">Item Title</th>
      <th scope="col">Status</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody className="table-group-divider">
    {
      claimList.map(
        claim => 
        <tr key={claim.id}>
          <td>{claim.id}</td>
          <td>{claim.itemId}</td>
          <td>{claim.userId}</td>
          <td><ItemTitleLoader itemId={claim.itemId}></ItemTitleLoader></td>
          <td style={{color: `${claim.approved===false? "red": "green"}`}}>{claim.approved===false?"Pending":"Claimed"}</td>
          <td><button className={`btn btn-success ${claim.approved===true? 'disabled': ''}`} onClick={()=>approveClaimById(claim.id)} type="button">Approve</button></td>
          <td><button className='btn btn-danger' onClick={()=>deleteClaimById(claim.id)} type="button">Delete</button></td>
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


function ItemTitleLoader({itemId})
{
  const [itemTitle,setItemTitle] = useState('');

  useEffect(()=>{
    async function fetchItemTitle(){
      //incase the item is deleted and title is not available
      try{
        const title  = await getItemTitle(itemId);
      setItemTitle(title);
      }catch(error){
        console.log("Some item is not available");
      }
      
    }
    fetchItemTitle();
  },[itemId]);

  return itemTitle ? itemTitle : 'Loading...';

}
