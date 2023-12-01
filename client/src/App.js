import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { StoreProvider } from "./utils/GlobalState";

import Home from "./pages/home";
import Shop from "./pages/shop";
import About from "./pages/about";
import Contact from "./pages/contact";
import Nav from "./components/Nav";
import StickyFooter from "./components/Footer";
import ProductCard from "./components/ProductCard";
// import StickyFooter from "./components/footer";

// Create an HTTP link for GraphQL queries
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
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
      <Router>
        <StoreProvider>
          <React.Fragment>
            <Nav></Nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/category/:_id" element={<ProductCard />}>
              </Route>
            </Routes>
            <StickyFooter></StickyFooter>
          </React.Fragment>
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
