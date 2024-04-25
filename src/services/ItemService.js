import axios from 'axios';

const ITEM_SERVICE_API_BASE_URL ="http://localhost:8081/item_service";
const CLAIM_SERVICE_API_BASE_URL ="http://localhost:8082/claim_service";
const USER_SERVICE_API_BASE_URL ="http://localhost:8080/user";
const ADMIN_SERVICE_API_BASE_URL ="http://localhost:8083/admin";

export const unClaimedItemList = ()=>
{
    return axios.get(ITEM_SERVICE_API_BASE_URL+"/all_unclaimeditems");
}

export const noOfUnclaimedItems = ()=>
{
    return axios.get(ITEM_SERVICE_API_BASE_URL+"/noOfUnclaimedItems");
}

export const allclaimreqs = ()=>
{
    return axios.get(ITEM_SERVICE_API_BASE_URL+"/getclaimbyuserid/:id");
}

export const itemDetails = (itemId)=>
{   //console.log(ITEM_SERVICE_API_BASE_URL+"/item_details/"+itemId);
    return axios.get(ITEM_SERVICE_API_BASE_URL+"/item_details/"+itemId);
}

export const userSignup = (User)=>
{
    return axios.post(USER_SERVICE_API_BASE_URL+"/newuser",User);
}

export const usernameAvailable= (username) =>
{
    return axios.get(USER_SERVICE_API_BASE_URL+'/checkusername/'+username);
}
export const userexists= async (email) =>
{
    return await axios.get(USER_SERVICE_API_BASE_URL+"/userbyemail",{params:{
        "email": email
    }});
}
export const userloginfunc= (LoginData) =>
{
    return axios.post(USER_SERVICE_API_BASE_URL+"/userlogin", LoginData);
}

export const updateUserData= (userid, User)=>
{
    return axios.put(USER_SERVICE_API_BASE_URL+"/update_user/"+userid,User);
}
export const reportFoundItem= (Item)=>
{
    return axios.post(ITEM_SERVICE_API_BASE_URL+"/report_founditem",Item);
}
export const raiseLostTicket= (Item)=>
{
    return axios.post(ITEM_SERVICE_API_BASE_URL+"/create_lostticket",Item);
}
export const userclaims= (userid)=>
{
    //console.log(CLAIM_SERVICE_API_BASE_URL+"/getclaimbyuserid/"+userid);
    return axios.get(CLAIM_SERVICE_API_BASE_URL+"/getclaimbyuserid/"+userid);
}
export const deleteClaim = (claimId)=>
{
    return axios.delete(CLAIM_SERVICE_API_BASE_URL+"/deleteclaim/"+claimId);
}
export const createClaim= (Claim)=>
{
    return axios.post(CLAIM_SERVICE_API_BASE_URL+"/newclaim",Claim);
}
export const adminloginfunc= (LoginData) =>
{
    return axios.post(ADMIN_SERVICE_API_BASE_URL+"/adminlogin", LoginData);
}
export const adminexists= (username)=>
{
    console.log("inside adminexists");
    return axios.get(ADMIN_SERVICE_API_BASE_URL+"/getadminbyusername/"+username);
}

export const allUsers= ()=>
{
    return axios.get(USER_SERVICE_API_BASE_URL+"/allusers");
}
export const allLostItems = ()=>
{
    return axios.get(ITEM_SERVICE_API_BASE_URL+"/all_lostitems");
}
export const allFoundItems = ()=>
{
    return axios.get(ITEM_SERVICE_API_BASE_URL+"/all_founditems");
}
export const deleteUser= (userId)=>
{
    return axios.delete(USER_SERVICE_API_BASE_URL+"/delete_user/"+userId);
}
export const deleteLostItemTicket = (itemId)=>
{
    return axios.delete(ITEM_SERVICE_API_BASE_URL+"/delete_lostitemticket/"+itemId);
}
export const deleteFoundItem = (itemId)=>
{
    return axios.delete(ITEM_SERVICE_API_BASE_URL+"/delete_founditem/"+itemId);
}

export const allclaims= ()=>
{
    return axios.get(CLAIM_SERVICE_API_BASE_URL+"/allclaims");
}
export const deleteClaimById = (claimId)=>
{
    return axios.delete(CLAIM_SERVICE_API_BASE_URL+"/deleteclaim/"+claimId);
}
export const approveClaim = (claimId)=>
{
    return axios.put(CLAIM_SERVICE_API_BASE_URL+"/approveclaim/"+claimId);
}
export const newAdmin= (Admin)=>
{
    console.log("inside newadmin api call");
    return axios.post(ADMIN_SERVICE_API_BASE_URL+"/newadmin",Admin);
}

export  const getFoundItemsForUser = (userid)=>
{
    return axios.get(ITEM_SERVICE_API_BASE_URL+"/all_founditemsByUser/"+userid);
}

export const getLostItemsForUser = (userid)=>
{
    return axios.get(ITEM_SERVICE_API_BASE_URL+"/all_lostitemsByUser/"+userid);
}

export const updateItemService = (itemid, ItemObj)=>
{
    return axios.put(ITEM_SERVICE_API_BASE_URL+"/update_item/"+itemid,ItemObj);
}

export const resolveLostItem = (itemid)=>
{
    return axios.put(ITEM_SERVICE_API_BASE_URL+"/change_statusResolved/"+itemid);
}