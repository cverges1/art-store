import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/home";
import Nav from "./components/nav";
import CategoryPage from "./pages/shop";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import StickyFooter from "./components/footer";

// Create an HTTP link for GraphQL queries
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Set up authentication headers for Apollo Client
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Main component representing the app
function App() {
  return (
    <ApolloProvider client={client}>
      <h1>CHRIS</h1>
    </ApolloProvider>
  );
}

export default App;
