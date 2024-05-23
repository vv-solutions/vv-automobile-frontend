import {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Input, message} from "antd";
import categoryFacade from "../../../facades/categoryFacade";
import {useRouter} from "next/router";
import AdminLayout from "../../../components/adminLayout";
import brandFacade from "../../../facades/brandFacade";

const CreatePage = () => {

    const router = useRouter();

    const [category, setCategory] = useState({
        name: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let createdCategory = await categoryFacade.create(category)
        message.success("Category created",1)
        await router.push("/admin/categories/"+createdCategory.id)
    };

    return (
        <AdminLayout>
            <Container>
                <Row className="justify-content-md-center ">
                    <Col md={6}>
                        <Form onSubmit={handleSubmit} className={"shadow p-3 bg-white rounded"}>
                            <h1>Create category</h1>
                            <Form.Group controlId="formCategoryName" className="mb-3">
                                <label>Name:</label>
                                <Input
                                    name="name"
                                    value={category.name}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Button type="primary" className={"float-end"} htmlType="submit">Create</Button>
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