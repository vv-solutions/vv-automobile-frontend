// pages/admin/categories/index.js

import AdminLayout from '../../../components/adminLayout';
import { Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {useState} from "react";

const CategoriesIndexPage = () => {
    const [categories,setCategories] = useState([])


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
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined style={{ color: 'blue' }} />
                    <DeleteOutlined style={{ color: 'red' }} />
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            id: '1',
            name: 'Category 1',
        },
        {
            key: '2',
            id: '2',
            name: 'Category 2',
        },
        // Add more categories as needed
    ];

    return (
        <AdminLayout>
            <Table columns={columns} dataSource={data} />
        </AdminLayout>
    );
};

export default CategoriesIndexPage;
