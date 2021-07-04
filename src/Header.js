import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
function Header() {

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/add">Add Product</Link>
                    <Link className="nav-link" to="/update">Update product</Link>
                    <Link className="nav-link" to="/signin">Sign in</Link>
                    <Link className="nav-link" to="/signup">Sign up</Link>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Header;