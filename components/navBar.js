import {useRouter} from "next/router";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Form, FormControl, NavItem, NavLink} from 'react-bootstrap';
import Link from "next/link"
import {useContext, useEffect, useState} from "react";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {Badge} from "antd";
import cartFacade from "../facades/cartFacade";
import {CartContext} from "../Context/CartContext";


function NavBar() {
    const {cartQuantity} = useContext(CartContext);

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
        <Navbar expand="sm" className="p-3" style={{ backgroundColor: "#2C3E50" }}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto align-items-center">
                    <Link href="/">
                        <img src="/logo.png" height="60px" alt="Logo"></img>
                    </Link>
                    <Link className="link" href="/">
                        Home
                    </Link>
                    <Link className="link" href="/admin">
                        Admin
                    </Link>
                    <Link className="link" href="/PriceAssessment">
                        Car Valuation
                    </Link>
                </Nav>
                {!router.pathname.toLocaleLowerCase().includes("admin") && (
                    <Form className="d-flex mx-auto search-form" onSubmit={search}>
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
                            }}
                        />
                        <Button variant="outline-light" type="submit">Search</Button>
                    </Form>
                )}
                <Nav className="ms-auto align-items-center">
                    <Link className="link me-5" href="/shop/cart" passHref>
                        <Badge count={cartQuantity} offset={[4, 0]} style={{ backgroundColor: '#f9f9f9', color: 'black', border: "none" }}>
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#BDC3C7' }} />
                        </Badge>
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>



    )
}

export default NavBar;