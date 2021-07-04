import './App.css';
import { Button } from "react-bootstrap";
import Header from "./Header";
import { BrowserRouter, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route path="/add">
          <AddProduct />
        </Route>
        <Route path="/update">
          <UpdateProduct />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
