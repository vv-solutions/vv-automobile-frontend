import AdminLayout from '../../components/adminLayout';

const AdminIndexPage = () => {
    return (
        <AdminLayout>
            <div style={{ padding: '16px' }}>
                <h1>Welcome to Admin Dashboard</h1>
                <p>Here you can manage products, orders, categories, and brands.</p>
            </div>
        </AdminLayout>
    );
};

export default AdminIndexPage;