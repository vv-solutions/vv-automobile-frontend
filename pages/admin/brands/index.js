// pages/admin/brands/index.js

import AdminLayout from '../../../components/adminLayout';
import { Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
            name: 'Brand 1',
        },
        {
            key: '2',
            id: '2',
            name: 'Brand 2',
        },
        // Add more brands as needed
    ];

    return (
        <AdminLayout>
            <Table columns={columns} dataSource={data} />
        </AdminLayout>
    );
};

export default BrandsIndexPage;
