import {useEffect, useState} from "react";
import {Button, Form, Row} from "react-bootstrap";

import {useRouter} from "next/router";
import productFacade from "../../facades/productFacade";
import ProductGrid from "../../components/ProductGrid";
import categoryFacade from "../../facades/categoryFacade";
import { Select } from "antd";
import brandFacade from "../../facades/brandFacade";
import {forEach} from "react-bootstrap/ElementChildren";
function Index() {

    const[result, setResult] = useState("")
    const [products, setProducts ] = useState([]);
    const [brands, setBrands ] = useState([]);
    const router = useRouter();

    const [pageCount, setPageCount] = useState(0);
    const[showLoadMoreBtn, setshowLoadMoreBtn] = useState(true)

    const [brandsSelected, setBrandsSelected ] = useState([]);
    const [direction, setDirection ] = useState("asc");
    const [orderBy, setOrderBy ] = useState("popularity");

    useEffect(() => {
       if(router.query.category) {
           fetchProducts(router.query.category);
           fetchBrands();
       }

    }, [router.isReady]);

    const fetchBrands = async() =>{
        const brandsFetched = await brandFacade.getAll()
        setBrands(brandsFetched.map(brand => ({
            label: brand.name,
            value: brand.id
        })))
        console.log(brandsFetched)
    }

    const fetchProducts = async (category, refreshList) => {
        const newProducts =  await productFacade.getProductsByCategory(category,15,pageCount,brandsSelected,orderBy,direction);
        if (newProducts.length<15){
            setshowLoadMoreBtn(false)
        }
        if(!refreshList) {
            setProducts(products.concat(newProducts));
        }else{
            setProducts(newProducts)
        }
        setPageCount(pageCount + 1);
    }
    const loadMore = () =>{
        fetchProducts(router.query.category)

    }
    const handleSortingChange = (value) => {
        setPageCount(0)
        if(value="popularity"){
            setDirection("desc")
            setOrderBy(value)
        }else if (value = "priceDesc"){
            setOrderBy("price")
            setDirection("desc")
        }else if (value = "priceAsc"){
            setOrderBy("price")
            setDirection("asc")
        }
        fetchProducts(router.query.category,true)
        console.log(`selected ${value}`);
    };

    const handleBrandChange = (value) => {
        setPageCount(0)
        setProducts([])
        setBrandsSelected(value)
        fetchProducts(router.query.category,true)
        console.log(`selected ${value}`);
    };

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
                            onChange={handleSortingChange}
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
                            onChange={handleBrandChange}
                            options={brands}
                        />
                    </div>
                </div>

                <Row>
                    {products.length > 0 &&
                        <ProductGrid products={products}/>
                    }
                </Row>
                {showLoadMoreBtn &&
                <div className={"text-center"}>

                <Button onClick={loadMore} className={"btn-secondary text-center"}>Load more</Button>
                </div>
                }
            </div>
        </>
    )
}

export default Index;