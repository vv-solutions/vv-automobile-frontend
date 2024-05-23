// pages/admin/products/index.js

import AdminLayout from '../../../components/adminLayout';
import {Table, Space, Form} from 'antd';
import {EditOutlined, DeleteOutlined, LoadingOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import categoryFacade from "../../../facades/categoryFacade";
import productFacade from "../../../facades/productFacade";
import {useRouter} from "next/router";
import { Spin } from 'antd';
import {Button, FormControl, InputGroup} from "react-bootstrap";
const ProductsIndexPage = () => {

    const [products,setProducts] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    useEffect (() => {

        fetchData();
    },[router.isReady])

    const fetchData = async () => {
        await productFacade.getAll(25,0).then((data) => {
            setProducts(data);
            setPageCount(1)
            setLoading(false); // Set loading to false once data is fetched
            setShowLoadMore(true)
        });

    }
    const loadMore = async (e) =>{
        let newProducts;
        await productFacade.getAll(25, pageCount).then((p)=> newProducts = p)
        setProducts(products.concat(newProducts));
        setPageCount(pageCount+1)

        console.log(e)
    }

    const [query,setQuery] = useState("");

    const searchProducts = async (e) =>{
        await productFacade.searchProducts(query).then(setProducts)
    }

    const [showLoadMore, setShowLoadMore] = useState(true)



    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price in DKK',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined style={{ color: 'blue' }} onClick={()=> clickEdit(record.id)}/>
                </Space>
            ),
        },
    ];

    const clickEdit=(id)=>{
        router.push("/admin/products/"+id)
    }
    if (loading) {
        return (
            <AdminLayout>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Spin size="large" />
            </div>
            </AdminLayout>
        );
    }

    const handleChange = async (e) => {
        const val = e.target.value;
        setQuery(val)
        if (val.length > 2) {
            setShowLoadMore(false)
            await productFacade.searchProducts(val).then(setProducts)
        }

        if(val.length < 1){
            await fetchData()
        }
    }

    return (
        <AdminLayout>
            {/*{loading ? <Spin size="large" /> : <Table columns={columns} dataSource={products} />}*/}
            <Form className="mb-3 w-25">
                <InputGroup>
                    <FormControl
                        placeholder="Search products..."
                        aria-label="Search products"
                        aria-describedby="basic-addon2"
                        value={query}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Form>
            <Table
                    pagination={false}
                   scroll={{
                       y: 1000,
                   }} columns={columns} dataSource={products}

            />

            <div className="d-flex justify-content-center mt-3">
                {showLoadMore &&
                    <Button className="btn-secondary" onClick={loadMore}>Load more</Button>
                }
            </div>
        </AdminLayout>
    );
};

export default ProductsIndexPage;
