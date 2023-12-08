import React, {useEffect} from "react";
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
import About from "./pages/about";
import Contact from "./pages/contact";
import Nav from "./components/Nav";
import StickyFooter from "./components/Footer";
import Header from "./components/header";
import Detail from "./pages/detail";
import Categories from "./pages/categories";
import NoMatch from "./pages/NoMatch";

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

client.clearStore();

// Main component representing the app
function App() {
  useEffect(() => {
    document.title = "Chirs Verges Art"
  }, [])
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <React.Fragment>
            <Header />
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/category/:id" element={<Categories />} />
              <Route path="/product/:id" element={<Detail />} />
              <Route 
                path="*" 
                element={<NoMatch />} 
              />
            </Routes>
            <StickyFooter />
          </React.Fragment>
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
