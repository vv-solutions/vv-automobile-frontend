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

    let orderBy = "popularity"
    let pageCount = 0
    useEffect(() => {
        fetchProducts();
    }, []);


    const fetchProducts = async () => {
        await productFacade.getProductsByCategory(1,15,pageCount,[],"price","asc").then(setProducts)
        pageCount++
    }
    const loadMore = () =>{

    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }

    return(
        <>
            <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded w-75 m-auto">
                <h1 className="text-center mb-4">Products</h1>
                <div className="filter mb-4" style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{marginRight: 15}}>
                        <p style={{margin: 0, fontSize: 12}}>Sorting</p>
                        <Select
                            defaultValue="popularity"
                            style={{minWidth: 160}}
                            onChange={handleChange}
                            options={[
                                {value: 'popularity', label: 'Popularity'},
                                {value: 'priceDesc', label: 'Price high-low'},
                                {value: 'priceAsc', label: 'Price low-high'},
                            ]}
                        />
                    </div>
                    <div>
                        <p style={{margin: 0, fontSize: 12}}>Brands</p>
                        <Select
                            mode="multiple"
                            showSearch
                            allowClear
                            style={{minWidth: 200, maxWidth: 300}}
                            placeholder="Choose brands"
                            onChange={handleChange}
                            options={options}
                        />
                    </div>
                </div>

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