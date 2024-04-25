import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer ,toast } from 'react-toastify'
import { allUsers, deleteUser } from '../../services/ItemService';
import Footer from '../User/Footer'
import NavbarAdmin from './NavbarAdmin'

export default function ManageUsers() {
  const navigate = useNavigate();
  //const [adminid, setAdminid] = useState('');
  //const [username, setUsername]= useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    let id = localStorage.getItem("adminid");
    //let uname = localStorage.getItem("username");
    if (!id) {
      navigate("/adminlogin");
    }
    else {
      //setAdminid(id);
      //setUsername(uname);
      getAllUsers();
    }
  }, [navigate]);

  async function getAllUsers()
  {
    const users = await allUsers();
    setUserList(users.data);
  }

  async function deleteUserById(userId)
    {
        console.log("inside deleteuserbyid");
      try{
        await deleteUser(userId);
        toast.success("User delete successful");
        getAllUsers();

      }catch(err)
      {
        toast.error("Some error occured");
      }
    }

  return (
    <div>
      <ToastContainer />
      <NavbarAdmin />

      <h3 className='text-center my-3'>All Users</h3>
      <div className="container table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Full Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              userList.map(
                user =>

                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.fullname}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td><button className='btn btn-danger' onClick={() => deleteUserById(user.id)} type="button">Delete</button></td>
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
