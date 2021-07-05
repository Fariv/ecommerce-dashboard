import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Protected from "./Protected";
import Signup from "./Signup";
import Signin from "./Signin";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import ProductList from "./ProductList";
import ProductShow from './ProductShow';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/add">
            <Protected Component={AddProduct} />
          </Route>
          <Route path="/update">
            <Protected Component={UpdateProduct} />
          </Route>
          <Route path="/product-show/:id">
            <Protected Component={ProductShow} />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/">
            <Protected Component={ProductList} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
