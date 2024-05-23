// pages/admin/products/index.js

import AdminLayout from '../../../components/adminLayout';
import { Table, Space } from 'antd';
import {EditOutlined, DeleteOutlined, LoadingOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import categoryFacade from "../../../facades/categoryFacade";
import productFacade from "../../../facades/productFacade";
import {useRouter} from "next/router";
import { Spin } from 'antd';
const ProductsIndexPage = () => {

    const [products,setProducts] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    useEffect (() => {
        const fetchData = async () => {
            await productFacade.getAll().then((data) => {
                setProducts(data);
                setLoading(false); // Set loading to false once data is fetched
            });
        }
        fetchData();
    },[router.isReady])

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

    return (
        <AdminLayout>
            {/*{loading ? <Spin size="large" /> : <Table columns={columns} dataSource={products} />}*/}
            <Table columns={columns} dataSource={products} />
        </AdminLayout>
    );
};

export default ProductsIndexPage;
