import React, { Component } from "react";
import query from "../query/fetchHotels";
import gql from "graphql-tag";
import { Link } from "react-router";
import { graphql } from "react-apollo";

class HotelList extends Component {
  //Get list of tariff for list of hotels
  renderTariff() {
    for (let i = 0; i < this.props.data.hotels.length; i++) {
      return (
        <li className="address">
          <span>&#8377;</span>
          {Math.max(
            ...this.props.data.hotels[i].tariffDetails.map(
              (tarif) => tarif.tariff
            ),
            0
          )}
        </li>
      );
    }
  }

  // Get list of Hotels from Backend
  renderHotels() {
    return this.props.data.hotels.map(
      ({ name, id, address, email, images, rating, tariff }) => {
        return (
          <li key={id} className="collection-item row">
            <div className="col s6">
              <img className="hotelImage" src={images} />
            </div>
            <div className="col s5">
              <Link
                to={{
                  pathname: `/hotel/${id}`,
                  state: { hotels: this.props.data.hotels },
                }}
              >
                <p className="title">
                  {name} - {rating}/5
                </p>
                <p className="address">{address}</p>
                <p className="address">{email}</p>
                <p className="address"> Price for 2 nights</p>
                <p>{this.renderTariff()}</p>
              </Link>
            </div>
            <div className="col s1"></div>
          </li>
        );
      }
    );
  }
  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderHotels()}</ul>
      </div>
    );
  }
}

export default graphql(query)(HotelList);
