import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Upload,
    Typography,
    Steps,
    Select,
    Alert,
    Divider,
    Col,
    Row,
    Space,
    InputNumber
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Step } = Steps;
const { Option } = Select;

const Home = () => {
    const [current, setCurrent] = useState(0);
    const [formData, setFormData] = useState({
        licensePlate: '',
        variant: '',
        kilometers: ''
    });

    const handleNext = (values) => {
        setFormData({ ...formData, ...values });
        setCurrent(current + 1);
    };

    const handlePrevious = () => {
        setCurrent(current - 1);
    };

    const handleFinish = (values) => {
        setFormData({ ...formData, ...values });
        setCurrent(current + 1);
    };

    const steps = [
        {
            title: 'Register Your Car',
            content: (
                <Form onFinish={handleNext} layout="vertical">


                    <Form.Item
                        label="License Plate"
                        name="licensePlate"
                        rules={[{ required: true, message: 'Please input your license plate!' }]}
                    >
                        <Input placeholder="Enter License Plate" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Find Car
                        </Button>
                    </Form.Item>

                    <Divider style={{ margin: '2rem 0' }}>Or</Divider>

                    <Form.Item label="Upload an Image of the Car">
                        <Upload>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: 'Mileage Information',
            content: (
                <Form onFinish={handleFinish} layout="vertical">
                    {/*<Title level={4}>Car Information</Title>*/}

                    <Form.Item
                        label="Kilometers Driven"
                        name="kilometers"
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="Enter kilometers" />
                    </Form.Item>

                    <Alert
                        message="If not provided, we will try to determine the kilometers driven automatically."
                        type="info"
                        showIcon
                        style={{ marginBottom: '1rem' }}
                    />

                    <Form.Item>
                        <Space>
                            <Button type="default" onClick={handlePrevious}>
                                Previous
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Next
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            ),

        },
        {
            title: 'Car Valuation',
            content: (
                <div>
                    <Title level={4}>Price Assessment</Title>
                    <p>Your car's price is estimated based on the provided details.</p>
                    <Divider />
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <p><strong>License Plate:</strong> {formData.licensePlate}</p>
                            <p><strong>Kilometers Driven:</strong> {formData.kilometers ? formData.kilometers : 'Auto-determined'}</p>
                        </Col>
                    </Row>
                    <Divider />
                    <p><strong>Estimated Price:</strong> 52.793 DKK</p> {/* Replace with actual price assessment logic */}
                    <Button type="default" onClick={handlePrevious} style={{ marginRight: '1rem' }}>
                        Previous
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div style={{ maxWidth: '40%', margin: '0 auto', padding: '2rem' }} className={"shadow p-3 bg-white rounded mt-5"}>
            <Steps current={current}>
                {steps.map((step, index) => (
                    <Step key={index} title={step.title} />
                ))}
            </Steps>

            <div style={{ margin: '2rem 0' }}>
                {steps[current].content}
            </div>
        </div>
    );
};

export default Home;
