// components/Layout.js

import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import { UserOutlined, ShoppingCartOutlined, AppstoreOutlined, TagOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
    const router = useRouter();

    const handleMenuItemClick = (path) => {
        router.push(`/admin/${path}`);
    };

    // Get the current pathname
    const currentPath = router.pathname;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div style={{ padding: '16px', color: 'white' }}>Admin Dashboard</div>
                <Menu theme="dark" mode="inline" selectedKeys={[currentPath]}>
                    <Menu.Item key="/admin/products" onClick={() => handleMenuItemClick('products')} icon={<AppstoreOutlined />}>
                        Products
                    </Menu.Item>
                    <Menu.Item key="/admin/orders" onClick={() => handleMenuItemClick('orders')} icon={<ShoppingCartOutlined />}>
                        Orders
                    </Menu.Item>
                    <Menu.Item key="/admin/categories" onClick={() => handleMenuItemClick('categories')} icon={<TagOutlined />}>
                        Categories
                    </Menu.Item>
                    <Menu.Item key="/admin/brands" onClick={() => handleMenuItemClick('brands')} icon={<UserOutlined />}>
                        Brands
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: '16px' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
