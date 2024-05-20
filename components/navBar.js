import {useRouter} from "next/router";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavItem, NavLink} from 'react-bootstrap';
import Link from "next/link"


function NavBar() {
    const router = useRouter();



    return(
        <Navbar expand="sm" className="p-3 mb-3" style={{backgroundColor:"#343a3f"}}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Link href="/">
                        <img src="../logo.png" height="30px" alt="Logo" style={{ filter: 'brightness(0) invert(1)' }}></img>
                    </Link>
                    <Link className={"link"} href="/">
                        Home
                    </Link>
                    <Link className={"link"} href="/index">
                        Shop
                    </Link>

                </Nav>

                <Link className={"link"} href="/shop/cart" passHref>
                    cart
                </Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;