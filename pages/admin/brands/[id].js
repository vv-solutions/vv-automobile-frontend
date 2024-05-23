import {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Input} from "antd";
import categoryFacade from "../../../facades/categoryFacade";
import {useRouter} from "next/router";
import AdminLayout from "../../../components/adminLayout";
import brandFacade from "../../../facades/brandFacade";
import {Textarea} from "react-bootstrap-icons";
import TextArea from "antd/lib/input/TextArea";

const IdPage = () => {

    const router = useRouter();
    const {id} = router.query

    const [brand, setBrand] = useState({
        id: "",
        name: ''
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBrand({
            ...brand,
            [name]: value
        });
    };

    useEffect(()=>{
        if(router.query.id){
            getBrand()
        }
    },[router.isReady])

    const getBrand = async () => {
        await brandFacade.getBrandById(id).then(setBrand)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await brandFacade.update(brand)
    };

    const goBack = () =>{
        router.back();
    }

    return (
        <AdminLayout>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <Form onSubmit={handleSubmit} className={"shadow p-3 bg-white rounded"}>
                        <h1>Edit Brand</h1>
                            <Form.Group controlId="formCategoryId" className="mb-3">
                                <label>ID:</label>
                                <Input
                                    value={brand.id}
                                    readOnly
                                    disabled
                                />
                            </Form.Group>
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
                                    <Button className="btn-secondary" onClick={goBack}>back</Button>
                                </Col>
                                <Col>
                                    <Button  className={"float-end"} type="submit">Save</Button>
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