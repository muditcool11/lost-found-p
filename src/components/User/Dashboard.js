import React, {useState,useEffect} from 'react'
import Card from './Card';
import Footer from './Footer'
import Navbar from './Navbar'
import {unClaimedItemList, noOfUnclaimedItems, createClaim, itemDetails} from '../../services/ItemService';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user_id, setUser_id] = useState(0);
    //const [user_email, setUser_email]= useState(0);
    const [user_name, setUser_name]= useState(0);
    // useEffect(()=>{
    //   console.log("User id set from localStorage: " ,user_id);
    //   console.log("User email set from localStorage: " ,user_email);
    //   console.log("User name set from localStorage: " ,user_name);
    // },[user_id,user_email,user_name]);

    useEffect(()=>{
      setUser_id(localStorage.getItem("userid"));
      //setUser_email(localStorage.getItem("email"));
      setUser_name(localStorage.getItem("name"));
    },[]);

    useEffect(()=>{
      let id = localStorage.getItem("userid");
      if(!id)
      {
        navigate("/login");
      }
    },[navigate]);
    // setUser_id(localStorage.getItem("userid"));
    //     console.log(user_id);
       const [unclaimedItems, setUnclaimedItems] = useState([]);

       useEffect(()=>{
        
        unClaimedItemList().then((response)=>{
          setUnclaimedItems(response.data);
        }).catch(error => {
          console.log(error);
        })
       },[])

    //Fetching No of unclaims from item-service
       const [unclaims , setUnclaims] = useState(0);
       useEffect(()=>{
        noOfUnclaimedItems().then((response)=>{
          setUnclaims(response.data);
        }).catch(error=>{
          console.log(error);
        })
       },[]);

       async function handleClaimItem(itemId){

          const ClaimObj = {
            "itemId": itemId,
            "userId": user_id,
            "approved": false
          };

          let itemdata = await itemDetails(itemId);
          if(itemdata.data.user_id===user_id)
          {
            toast.error("You cannot claim your reported item");
          }
          else
          {
            try{
              await createClaim(ClaimObj);
              toast.success("Claim request created");
            }catch(err)
            {
              toast.error("Some error occured");
            }
          }        
       }


  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <div className="col-6 pt-3">
            <h4>Welcome, {user_name}</h4>
          </div>
      <div className="container my-5 alert rounded" style={{backgroundColor:'#9eeaf9'}}>
        <div className="row " >
          
        <div className="col-6">
            <h5>Total Unclaimed Items</h5>
        </div>
        <div className="col-6">
            <h5>{unclaims}</h5>
        </div>
        </div>
      </div>
      <div className="container ">
  <div className="row justify-content-left">
  {
  unclaimedItems.map(
    item => 
    <div className="col-lg-4 col-sm-12 col-md-6 my-3" key={item.id}>
      <Card key={item.id} title={item.title} category={item.category} location={item.location} description={item.description} date={item.date} onClaim={()=> handleClaimItem(item.id)}/> 
    </div>
  )
}
  </div>
</div>

  <Footer />
    </div>
  )
}
