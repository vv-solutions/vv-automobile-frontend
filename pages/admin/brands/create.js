import {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Input, message} from "antd";
import categoryFacade from "../../../facades/categoryFacade";
import {useRouter} from "next/router";
import AdminLayout from "../../../components/adminLayout";
import brandFacade from "../../../facades/brandFacade";
import {Textarea} from "react-bootstrap-icons";
import TextArea from "antd/lib/input/TextArea";

const CreatePage = () => {

    const router = useRouter();

    const [brand, setBrand] = useState({
        name: '',
        description:''
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBrand({
            ...brand,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let createdBrand = await brandFacade.create(brand)
        message.success("Brand created",1)
        await router.push("/admin/brands/"+createdBrand.id)
    };

    return (
        <AdminLayout>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <Form onSubmit={handleSubmit} className={"shadow p-3 bg-white rounded"}>
                            <h1>Create Brand</h1>
                            <Form.Group controlId="formCategoryName" className="mb-3">
                                <label>Name:</label>
                                <Input
                                    name="name"
                                    value={brand.name}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCategoryName" className="mb-3">
                                <label>Description:</label>
                                <TextArea
                                    type={"textArea"}
                                    name="description"
                                    value={brand.description}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Button  className={"float-end"} type="submit">Create</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </AdminLayout>
    );
};

export default CreatePage;