import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
function Header() {

    function signOut(e) {

        e.preventDefault();
        localStorage.clear();
        history.push("/signup");
    }

    const history = useHistory();

    let data = localStorage.getItem("user_info");
    data = JSON.parse(data);
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    {
                        localStorage.getItem("user_info") ?
                            <>
                                <Link className="nav-link" to="/">Products</Link>
                                <Link className="nav-link" to="/add">Add Product</Link>
                                <Link className="nav-link" to="/update">Update product</Link>
                            </>
                            :
                            <>
                                <Link className="nav-link" to="/signin">Sign in</Link>
                                <Link className="nav-link" to="/signup">Sign up</Link>
                            </>
                    }
                </Nav>
                {
                    localStorage.getItem("user_info") ?
                    (<Nav>
                        <NavDropdown title={data.username}>
                            <NavDropdown.Item>
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={signOut}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>)
                    :null
                }
            </Navbar>
        </div>
    );
}

export default Header;