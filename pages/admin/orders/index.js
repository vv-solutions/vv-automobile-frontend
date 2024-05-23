// pages/admin/orders/index.js

import AdminLayout from '../../../components/adminLayout';
import {Table, Space, Spin, Form} from 'antd';
import {EditOutlined, DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import productFacade from "../../../facades/productFacade";
import orderFacade from "../../../facades/orderFacade";
import {Button, FormControl, InputGroup} from "react-bootstrap";

const OrdersIndexPage = () => {
    const [orders,setOrders] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);

    useEffect (() => {
        fetchData();
    },[router.isReady])

    const fetchData = async () => {
        await orderFacade.getAll(25,0).then((data) => {
            // Round total price to 2 decimal places
            const formattedData = data.map(order => ({
                ...order,
                totalPrice: Number(order.totalPrice).toFixed(2)
            }));
            setPageCount(1)
            setOrders(formattedData);
            setLoading(false); // Set loading to false once data is fetched
            setShowLoadMore(true)
        });

    }
    const loadMore = async (e) =>{
        let newOrders;
        await orderFacade.getAll(25, pageCount).then((o)=> newOrders = o)
        setOrders(orders.concat(newOrders));
        setPageCount(pageCount+1)

    }

    const [query,setQuery] = useState("");

    const searchProducts = async (e) =>{
        await orderFacade.searchOrders(query).then(setOrders)
    }

    const [showLoadMore, setShowLoadMore] = useState(true)
    const clickEdit=(id)=>{
        router.push("/admin/orders/"+id)
    }


    const handleChange = async (e) => {
        const val = e.target.value;
        setQuery(val)
        if (val.length > 2) {
            setShowLoadMore(false)
            await orderFacade.searchOrders(val).then(setOrders)
        }

        if(val.length < 1){
            await fetchData()
        }
    }
    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Customer Email',
            dataIndex: 'email',
            key: 'customer',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalPrice',
            key: 'amount',
        },
        {
            title: 'Timestamp',
            dataIndex: 'create',
            key: 'timestamp',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <EyeOutlined style={{ color: 'blue' }} onClick={() => clickEdit(record.id)} />
                </Space>
            ),
        },
    ];

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
                }} columns={columns} dataSource={orders}

            />

            <div className="d-flex justify-content-center mt-3">
                {showLoadMore &&
                    <Button className="btn-secondary" onClick={loadMore}>Load more</Button>
                }
            </div>
        </AdminLayout>
    );

};

export default OrdersIndexPage;