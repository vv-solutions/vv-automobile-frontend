import {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Input} from "antd";
import categoryFacade from "../../../facades/categoryFacade";
import {useRouter} from "next/router";
import AdminLayout from "../../../components/adminLayout";

const IdPage = () => {

    const router = useRouter();
    const {id} = router.query

    const [category, setCategory] = useState({
        id: "",
        name: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value
        });
    };

    useEffect(()=>{
        if(router.query.id){
            getCategory()
        }
    },[router.isReady])

    const getCategory = async () => {
        await categoryFacade.getById(id).then(setCategory)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await categoryFacade.update(category)
    };

    const goBack = () =>{
        router.push("/admin/categories")
    }

    return (
        <AdminLayout>
        <Container>
            <Row className="justify-content-md-center ">
                <Col md={6}>
                    <Form onSubmit={handleSubmit} className={"shadow p-3 bg-white rounded"}>
                    <h1>Edit category</h1>
                        <Form.Group controlId="formCategoryId" className="mb-3 ">
                            <label>ID:</label>
                            <Input
                                value={category.id}
                                readOnly
                                disabled
                            />
                        </Form.Group>
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
                                <Button className="btn-secondary" onClick={goBack}>back</Button>
                            </Col>
                            <Col>
                                <Button type="primary" className={"float-end"} htmlType="submit">Save</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
            </AdminLayout>
    );
};

    export default IdPage;