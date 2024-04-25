import React from 'react'
import { Link } from 'react-router-dom'


export default function HomePage() {
  return (
    <div>
      <div className="mt-5">
        <div className="container">
          <main role="main">
            <div className="jumbotron">
              <div className="container">
                <h1 className="display-3">Welcome to,<br/>Lost and Found Portal </h1>
                <p>This is is a web application that can help you find your lost item effectively.</p>
                <div className='row justify-content-center'>
                  <div className="col-md-2 col-sm-1 py-2">
                  <Link className="btn btn-primary btn-lg" to="/login" role="button">Login &raquo;</Link>
                  </div>
                  <div className="col-md-2 col-sm-1 py-2">
                  <Link className="btn btn-primary btn-lg" to="/signup" role="button">SignUp &raquo;</Link>
                  </div>        
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}
