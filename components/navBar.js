import {useRouter} from "next/router";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Form, FormControl, NavItem, NavLink} from 'react-bootstrap';
import Link from "next/link"
import {useState} from "react";


function NavBar() {
    const router = useRouter();

const[query,setQuery] = useState("")

    const handleChange = (e)=>{
        setQuery(e.target.value)
    }
    const search = (e) => {
    e.preventDefault();
        const url = {
            pathname: "/searchProducts",
            query: { ...router.query, query: query }
        }

        //router.query.category = e.target.id;
        router.push(url)
    }

    return (
        <Navbar expand="sm" className="p-3 mb-3" style={{ backgroundColor: "#2C3E50" }}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto align-items-center">
                    <Link href="/">
                        <img src="../logo.png" height="60px" alt="Logo" ></img>
                    </Link>
                    <Link className="link" href="/">
                        Home
                    </Link>
                    <Link className="link" href="/index">
                        Shop
                    </Link>
                </Nav>
                <Form className="d-flex me-auto" style={{ flexGrow: 1, maxWidth: "500px", marginRight: "15px" }} onSubmit={search}>
                    <FormControl
                        type="search"
                        placeholder="Search products"
                        className="me-2"
                        aria-label="Search"
                        value={query}
                        onChange={handleChange}
                        style={{
                            backgroundColor: "#ECF0F1",
                            borderColor: "#6c757d",
                            color: "#ffffff"
                        }}
                    />
                    <Button variant="outline-light" type={"submit"}>Search</Button>
                </Form>
                <Link className="link" href="/shop/cart" passHref>
                    cart
                </Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;