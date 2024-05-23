import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {Container, Row, Col, Table, Spinner, Button} from 'react-bootstrap';
import { Card } from 'antd';
import AdminLayout from "../../../components/adminLayout";
import orderFacade from "../../../facades/orderFacade";


const OrderDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [order, setOrder] = useState(null);




    useEffect(() => {
        if (id) {
           getData()
        }
    }, [id]);

    const getData = async () => {
        await orderFacade.getById(id).then(setOrder)
    }

    const goBack = () => {
        router.back();
    };

    return (
        <AdminLayout>

            {order &&
            <Container>
                <Row className="my-4">
                    <Col>
                        <Button variant="secondary" onClick={goBack}>Go Back</Button>
                    </Col>
                </Row>

                <Row className="my-4">
                    <Col>
                        <h1>Order Details</h1>
                    </Col>
                </Row>
            <Row className="mb-4">
                <Col>
                    <Card title="Order Information">
                        <p><strong>Order ID:</strong> {order.id}</p>
                        <p><strong>Order Date:</strong> {new Date(order.create).toLocaleDateString()}</p>
                        <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                    <Card title="Customer Information">
                        <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card title="Shipping Information">
                        <p><strong>Address:</strong> {order.street} {order.houseNumber}</p>
                        <p><strong>Address line 2:</strong> {order.addressLine2}</p>
                        <p><strong>Zipcode:</strong> {order.zipcode}</p>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card title="Order Lines">
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Line Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {order.orderLines.map((line) => (
                                <tr key={line.id}>
                                    <td>{line.productId}</td>
                                    <td>{line.quantity}</td>
                                    <td>${line.unitPrice.toFixed(2)}</td>
                                    <td>${line.linePrice.toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </Container>
            }
        </AdminLayout>
    );
};

export default OrderDetails;