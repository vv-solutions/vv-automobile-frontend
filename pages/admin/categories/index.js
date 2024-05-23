// pages/admin/categories/index.js

import AdminLayout from '../../../components/adminLayout';
import { Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import brandFacade from "../../../facades/brandFacade";
import categoryFacade from "../../../facades/categoryFacade";
import {useRouter} from "next/router";

const CategoriesIndexPage = () => {

    const router = useRouter()
    const clickEdit=(id)=>{
        router.push("/admin/categories/"+id)
    }


    const columns = [
        {
            title: 'Category ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'id',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined style={{ color: 'blue' }} onClick={()=>clickEdit(record.id)}/>
                </Space>
            ),
        },
    ];

    useEffect(()=>{
        fetchData()
    },[])


    const [categories, setCategories] = useState()
    const fetchData=async () => {
        await categoryFacade.getAll().then(setCategories)
    }

    return (
        <AdminLayout>
            <Table columns={columns} dataSource={categories} />
        </AdminLayout>
    );
};

export default CategoriesIndexPage;
