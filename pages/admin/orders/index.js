// pages/admin/orders/index.js

import AdminLayout from '../../../components/adminLayout';
import {Table, Space, Spin} from 'antd';
import {EditOutlined, DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import productFacade from "../../../facades/productFacade";
import orderFacade from "../../../facades/orderFacade";

const OrdersIndexPage = () => {
    const [orders,setOrders] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(true);


    useEffect (() => {
        const fetchData = async () => {
            await orderFacade.getAll().then((data) => {
                // Round total price to 2 decimal places
                const formattedData = data.map(order => ({
                    ...order,
                    totalPrice: Number(order.totalPrice).toFixed(2)
                }));
                setOrders(formattedData);
                setLoading(false); // Set loading to false once data is fetched
            });
        }
        fetchData();
    },[router.isReady])
    const clickEdit=(id)=>{
        router.push("/admin/orders/"+id)
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
            <Table columns={columns} dataSource={orders} />
        </AdminLayout>
    );

};

export default OrdersIndexPage;