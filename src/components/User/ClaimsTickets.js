import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { deleteClaim, itemDetails, userclaims } from '../../services/ItemService';
import Footer from './Footer'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';


async function getItemTitle(itemId)
  {
    const ItemDetails = await itemDetails(itemId);
    console.log("Title  value:"+ItemDetails.data.title);
    return ItemDetails.data.title;
  }

export default function Claims_Tickets() {
  //user id
  const navigate = useNavigate();
  const [user_id,setUser_id] = useState('');
  const [claimList,setClaimList] = useState([]);

  // useEffect(()=>{
  //   setUser_id(localStorage.getItem("userid"));
  //   // console.log("Userid :"+user_id);
    
  // },[]);
  // console.log(user_id);
  // useEffect(()=>{
  //   getallclaim(user_id);
  // },[user_id])

  useEffect(()=>{
    let id = localStorage.getItem("userid");
    if(!id)
    {
      navigate("/login");
    }
    else{
      setUser_id(id);
    }
  },[navigate]);

  useEffect(()=>{
    if(user_id)
    {
      getallclaim(user_id);
    }
  },[user_id]);

  async function getallclaim(user_id)
  {
    const datalist = await userclaims(user_id);
    console.log(datalist.data);
    setClaimList(datalist.data);
  }


  //  async function getItemTitle(itemId)
  // {
  //   const ItemDetails = await itemDetails(itemId);
  //   console.log("Title  value:"+ItemDetails.data.title);
  //   return ItemDetails.data.title;
  // }

    async function deleteClaimById(claimId)
    {
      try{
        await deleteClaim(claimId);
        toast.success("Claim delete successful");
        getallclaim(user_id);

      }catch(err)
      {
        toast.error("Some error occured");
      }
    }


  return (
    <div>
      <ToastContainer/>
      <Navbar/>
    
        <h3 className='text-center my-3'>All Claim Requests</h3>
       <div className="container table-responsive">
       <table className="table table-hover"> 
  <thead>
    <tr>
      <th scope="col">Claim ID</th>
      <th scope="col">Item ID</th>
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
          {/* <td>{(getItemTitle(claim.itemId).then(x=>{console.log(x)}))}</td> */}
          <td><ItemTitleLoader itemId={claim.itemId}></ItemTitleLoader></td>
          <td style={{color: `${claim.approved===false? "red": "green"}`}}>{claim.approved===false?"Pending":"Claimed"}</td>
          <td><button className={`btn btn-danger ${claim.approved===true?'disabled':''}`} onClick={()=>deleteClaimById(claim.id)} type="button">Delete</button></td>
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
      const title  = await getItemTitle(itemId);
      setItemTitle(title);
    }
    fetchItemTitle();
  },[itemId]);

  return itemTitle ? itemTitle : 'Loading...';

}
