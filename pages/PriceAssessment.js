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
    InputNumber, Spin, message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import productFacade from "../facades/productFacade";
import predictionFacade from "../facades/predictionFacade";
import orderFacade from "../facades/orderFacade";

const { Title } = Typography;
const { Step } = Steps;
const { Option } = Select;

const Home = () => {
    const [current, setCurrent] = useState(0);
    const [formData, setFormData] = useState({
        numberplate: null,
        image: null,
        km: null
    });

    const [isLoading,setIsLoading] = useState(true)

    const [estimatedPrice,setEstimatedPrice] = useState(0)

    const initialStateCar ={"make": "",
        model: "",
        modelYear: "",
        gearType: "",
        kilometers: "",
        fuelType: "",
        horsePower: "",
        result: '',
        reg: ''}

    const [car,setCar] = useState(initialStateCar);


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

    const handleUpload = ({file}) =>{
        file["status"] = "done"
        setFormData({ ...formData, ['image']:file });
    }

    const handleSubmit = async (values) => {

        setFormData({...formData, ...values});

        let data = formData;

        data["km"] = values.km;


        setCurrent(current + 1);
        setIsLoading(true)
        await predictionFacade.getPrediction(data).then(async (res) => {
            const r = await res.json();
            if (res.status != 200) {
                message.error(r.message+ ". Please reset to try again", 5)
                setEstimatedPrice(0)
            } else {
                setCar(r)
                //setEstimatedPrice(r)
            }
        })
        setIsLoading(false)
    }

    const handleReset = () => {
        setFormData({
            numberplate: null,
            image: null,
            km: null
        })
        setEstimatedPrice(0)
        setCar(initialStateCar)
        setCurrent(0);
    }

    const handleImageChange = ({file}) =>{
        file["status"] = "done"
    }

    const steps = [
        {
            title: 'Register Your Car',
            content: (
                <Form onFinish={handleNext} layout="vertical">

                    <Form.Item
                        label="License Plate"
                        name="numberplate"
                        rules={[{ required: false, message: 'Please input your license plate!' }]}
                    >
                        <Input placeholder="Enter License Plate" />
                    </Form.Item>

                    <Divider style={{ margin: '2rem 0' }}>Or</Divider>

                    <Form.Item label="Upload an Image of the Car">
                        <Upload onChange={handleImageChange} listType="picture"
                                maxCount={1} action={""} customRequest={handleUpload}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: 'Mileage Information',
            content: (
                <Form onFinish={handleSubmit} layout="vertical">
                    {/*<Title level={4}>Car Information</Title>*/}

                    <Form.Item
                        label="Kilometers Driven"
                        name="km"
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
                    <Title level={3}>Car Valuation</Title>
                    {!isLoading ? (
                        <div>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <p>Your car's price is estimated based on the details below.</p>
                            <Divider />
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    {
                                     car.numberplate &&
                                    <p><strong>License Plate:</strong> {car.numberplate.toUpperCase()}</p>
                                    }
                                    {
                                     car.make   &&
                                    <p><strong>Make:</strong> {car.make[0].toUpperCase() + car.make.slice(1)}</p>
                                    }
                                    {car.model &&
                                    <p><strong>Model:</strong> {car.model[0].toUpperCase() + car.model.slice(1)}</p>
                                    }
                                    {
                                        car.modelYear &&
                                    <p><strong>Model Year:</strong> {car.modelYear}</p>
                                    }
                                    {car.kilometers &&
                                    <p><strong>Kilometers Driven:</strong> {car.kilometers || 'Auto-determined'}</p>
                                    }
                                </Col>
                                <Col span={12}>
                                    <p><strong>Fuel Type:</strong> {car.fuelType}</p>
                                    <p><strong>Horse Power:</strong> {car.horsePower}</p>
                                    <p><strong>Gear Type:</strong> {car.gearType == "M"? "Manual" : "Automatic"}</p>
                                    <p><strong>1. Registration:</strong> {car.reg}</p>
                                </Col>
                            </Row>
                            <Divider />
                            {car.result > 0 && (
                                <p><strong>Estimated Price:</strong> {car.result.toFixed(2)} DKK</p>
                            )}
                            <Button type="default" onClick={handleReset} style={{ marginRight: '1rem' }}>
                                Reset
                            </Button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '30vh' }}>
                            <Spin size="large" />
                        </div>
                    )}
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
