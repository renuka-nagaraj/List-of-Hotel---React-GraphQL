import "./style/style.css";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";

import App from "./components/App";
import HotelList from "./components/HotelList";
import HotelDetails from "./components/HotelDetail";
import CreateHotel from "./components/HotelCreate";

const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={HotelList} />
          <Route path="hotel/new" component={CreateHotel} />
          <Route path="hotel/:id" component={HotelDetails} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
