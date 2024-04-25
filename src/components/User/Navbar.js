import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

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
          <Link className="nav-link" to="/dashboard">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reportItem">Report Item</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/lostTicket">Lost Ticket</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/claimTicket">Claims</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/account">Account</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={handlelogout} to="/login">Logout</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
