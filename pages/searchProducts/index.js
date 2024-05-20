import {useEffect, useState} from "react";
import {Button, Form, Row} from "react-bootstrap";

import {useRouter} from "next/router";
import productFacade from "../../facades/productFacade";
import ProductGrid from "../../components/ProductGrid";
import categoryFacade from "../../facades/categoryFacade";
import { Select } from "antd";
function Index() {

    const[result, setResult] = useState("")
    const [products, setProducts ] = useState([]);
    const router = useRouter();
    const[search,setSearch] = useState();
    // const { addToCart } = useCart();



    useEffect(() => {
        if(router.query.query) {
            fetchProducts(router.query.query);
        }

    }, [router.isReady, router.query.query]);


    const fetchProducts = async (query) => {
        console.log("new test : "+ query)
        await productFacade.searchProducts(query).then(setProducts)
    }

    return(
        <>
            <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded w-75 m-auto">
                <h1 className="text-center mb-4">Products</h1>
                <Row>
                    {products.length > 0 &&
                        <ProductGrid products={products}/>
                    }
                </Row>
            </div>
        </>
    )
}

export default Index;