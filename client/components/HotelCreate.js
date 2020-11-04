import React, { Component } from "react";
import mutation from "../mutation/createHote";
import { Link, hashHistory } from "react-router";
import { graphql } from "react-apollo";

class CreateHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      phone: "",
      email: "",
      country: "",
      pincode: "",
      images: "",
      errors: [],
    };
  }

  // on sumbit post the form field values
  onSubmit(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          name: this.state.name,
          address: this.state.address,
          phone: this.state.phone,
          email: this.state.email,
          country: this.state.country,
          pincode: this.state.pincode,
          images: this.state.images,
        },
      })
      .then(() => hashHistory.push("/"))
      .catch((res) => {                                                       // error handling
        this.setState({ errors: res.graphQLErrors[0].message });
      });
  }
  render() {
    let errors = "";
    if (this.state.errors.length) {
      errors = this.state.errors.map((message) => {
        return message;
      });
    }

    return (
      <div className="row">
        <Link to="/">Back</Link>
        <h5>Create Hotel</h5>
        <form onSubmit={this.onSubmit.bind(this)} className="col s6">
          <div className="input-fields">
            <label>Name</label>
            <input
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              placeholder="Name"
            ></input>
          </div>
          <div className="input-fields">
            <label>Hotel Image</label>
            <input
              value={this.state.images}
              onChange={(e) => this.setState({ images: e.target.value })}
              placeholder="Image"
            ></input>
          </div>
          <div className="input-fields">
            <label>Address</label>
            <input
              value={this.state.address}
              onChange={(e) => this.setState({ address: e.target.value })}
              placeholder="Address"
            ></input>
          </div>
          <div className="input-fields">
            <label>Phone</label>
            <input
              value={this.state.phone}
              onChange={(e) => this.setState({ phone: e.target.value })}
              placeholder="Phone"
            ></input>
          </div>
          <div className="input-fields">
            <label>Email</label>
            <input
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder="Email"
            ></input>
          </div>
          <div className="input-fields">
            <label>Country</label>
            <input
              value={this.state.country}
              onChange={(e) => this.setState({ country: e.target.value })}
              placeholder="Country"
            ></input>
          </div>
          <div className="input-fields">
            <label>Pincode</label>
            <input
              value={this.state.pincode}
              onChange={(e) => this.setState({ pincode: e.target.value })}
              placeholder="Pincode"
            ></input>
          </div>
          <div className="error">
            {errors.length > 0 &&
              errors.map((error) => <div key={error.key}>{error.message}</div>)}
          </div>

          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default graphql(mutation)(CreateHotel);
