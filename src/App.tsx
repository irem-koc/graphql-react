import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://countries.trevorblades.com/",
  });
  return (
    <ApolloProvider client={client}>
      <Navbar />

      <Outlet />
    </ApolloProvider>
  );
}

export default App;
