import React, { Component } from "react";
import query from "../query/hotel";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { Link, hashHistory } from "react-router";

class HotelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "Select Hotel Name", id: "1" };
    this.handleChange = this.handleChange.bind(this);
  }

  //Get list of amenities for given hotelID
  returnAmenities() {
    const { amenities } = this.props.data.hotel;
    return Object.keys(amenities[0]).map((amen) => {
      if (amenities[0][amen] === true) {
        return <li>{amen}</li>;
      }
    });
  }

  // Manipulating to get review for given hotelID
  returnReviewer() {
    return this.props.data.hotel.review.map(({ id, reviewer, comments }) => {
      return (
        <div key={id}>
          <li className="row display">
            <div className="col-s2">
              <img
                src={
                  "https://lh5.googleusercontent.com/p/AF1QipOUCtR7LQ8Z0xBUu3yPZSgw8OcGgMVcQZGLpX42=w592-h404-n-k-no-v1"
                }
                alt="Avatar"
                className="avatar"
              ></img>
            </div>
            <div className="col-s2">
              <p>{reviewer}</p>
              <span>{comments}</span>
            </div>
          </li>
        </div>
      );
    });
  }

  // display tariff , amenities details based on hotelID
  returnTarif() {
    return this.props.data.hotel.tariff.map(
      ({ id, roomType, tariff, image }) => {
        return (
          <li key={id} className="horizontalListStyle">
            <h6>{roomType}</h6>
            <br></br>
            <div>
              <img className="roomtype-img" src={image}></img>
            </div>
            <p>Amenities</p>
            {this.returnAmenities()}
            <p>
              Price for 2 nights
              <br></br>
              <span>&#8377;</span>
              {tariff}
            </p>
            <button type="button" className="btn btn-danger">
              BOOK NOW
            </button>
          </li>
        );
      }
    );
  }

  // On dropdown change to get list of hotels
  handleChange(event) {
    hashHistory.push({
      pathname: `/hotel/${event.target.value}`,
      state: { hotels: this.props.location.state.hotels },
    });
    this.setState({ value: event.target.value, id: event.target.id });
  }

  // diplay all the manipulated values in UI
  render() {
    const { hotel } = this.props.data;

    const hotelName = this.props.location.state.hotels.map((hotelName) => {
      return hotelName.name;
    });

    if (!hotel) {
      return <div>Loading.....</div>;
    }
    return (
      <div key={hotel.id}>
        <Link to="/"> Back</Link>

        <h5>Select Hotel to get details</h5>
        <select
          value={this.state.value}
          id={this.state.id}
          onChange={this.handleChange}
        >
          {this.props.location.state.hotels.map(({ name, id }) => (
            <option id={id} value={id} key={id}>
              {name}
            </option>
          ))}
        </select>
        <br></br>
        <img
          className="specificHotelImage collection-item"
          src={hotel.images}
        />
        <div className="collection hotleldetails">
          <h5>
            <b>
              {hotel.name} - {hotel.rating}
            </b>
          </h5>
          <h6>{hotel.email}</h6>
          <p>{hotel.address}</p>
        </div>
        <div className="">
          <h4>Room Type</h4>
          <ul>{this.returnTarif()}</ul>
        </div>
        <hr></hr>
        <div>
          <h4>Reviews</h4>
          {this.returnReviewer()}
        </div>
      </div>
    );
  }
}

export default graphql(query, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(HotelDetails);
