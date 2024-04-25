import React from 'react'

export default function Card(props) {
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{props.category}</h6>
          <h6 className="card-subtitle mb-2 text-body-secondary">{props.location}</h6>
          <h6 className="card-subtitle mb-2 text-body-secondary">{props.date.slice(0,10)}</h6>
          <p className="card-text">{props.description}</p>
          <button className="btn btn-primary" onClick={props.onClaim}>Claim</button>

        </div>
      </div>
    </div>
  )
}
