import React, { Component } from "react";
import { Link } from "react-router";

class Headers extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            <i className="material-icons"> airline_seat_flat</i>
          </Link>
          <ul className="right">
            <Link to="/hotel/new" className="right alignment">
              <button className="btn">CREATE HOTEL</button>
            </Link>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Headers;
