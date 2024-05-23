// pages/admin/brands/index.js

import AdminLayout from '../../../components/adminLayout';
import { Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import brandFacade from "../../../facades/brandFacade";
import categoryFacade from "../../../facades/categoryFacade";
import {useRouter} from "next/router";
import {Button} from "react-bootstrap";

const BrandsIndexPage = () => {
    const columns = [
        {
            title: 'Brand ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Brand Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined style={{ color: 'blue' }} onClick={()=>clickEdit(record.id)} />
                </Space>
            ),
        },
    ];

    const router = useRouter()
    const clickEdit=(id)=>{
        router.push("/admin/brands/"+id)
    }

    const clickCreate=()=>{
        router.push("/admin/brands/create")
    }

    useEffect(()=>{
        fetchData()
    },[])


    const [brands, setBrands] = useState()
    const fetchData=async () => {
        await brandFacade.getAll().then(setBrands)
    }


    return (
        <AdminLayout>
            <Button className={"float-end"} onClick={()=>clickCreate()}>+</Button>
            <Table columns={columns} dataSource={brands} />
        </AdminLayout>
    );
};

export default BrandsIndexPage;
