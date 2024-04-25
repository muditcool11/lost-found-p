import React from 'react'
import { Link } from 'react-router-dom'

export default function NavbarAdmin() {

  function handlelogout(e)
  {
    localStorage.clear();
  }

  return (
    <div>
      
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Lost & Found Portal</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav ">
        <li className="nav-item">
          <Link className="nav-link " to="/adminDashboard">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/manageItems">Items</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/manageUsers">Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/manageClaims">Claims</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/adminSignup">Add Admin</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" onClick={handlelogout} to="/adminlogin">Logout</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
   
  )
}
