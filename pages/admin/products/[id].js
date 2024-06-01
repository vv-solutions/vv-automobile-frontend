import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import { Card, Form, Input, InputNumber, message } from 'antd';
import productFacade from "../../../facades/productFacade";
import brandFacade from "../../../facades/brandFacade";
import categoryFacade from "../../../facades/categoryFacade";
import AdminLayout from "../../../components/adminLayout";
import {log} from "next/dist/server/typescript/utils";

const ProductDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState(null);
    const [brands, setBrands] = useState(null);
    const [form] = Form.useForm();
    const [availability,setAvailability] = useState(null);

    useEffect(() => {
        if (id) {
                getData()

        }
    }, [id]);


    const getData =async ()=>{
        await productFacade.getProductById(id).then(setProduct)
        await brandFacade.getAll().then(setBrands)
        await categoryFacade.getAll().then(setCategories)
        await productFacade.getProductAvailability(id).then(setAvailability)
    }


    const goBack = () => {
        router.push("/admin/products")
    };


    const handleFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    if (!product) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" />
            </Container>
        );
    }
    
    const handleSubmit =  async (e)=>{
     e.preventDefault();
     await productFacade.update(product)
        message.success("Product updated",1)
    }

    const handleChange = (e) =>{
        const id = e.target.id;
        const value = e.target.value;

        setProduct({...product,[id]:value})
    }

    const handleChangeAvailability = (e) =>{
        const id = e.target.id;
        const value = e.target.value;

        setAvailability({...availability,[id]:value})
    }

    const handleUpdateAvailability =  async ()=>{
        let a = availability;

        a["product"] = product
        await productFacade.updateAvailability(a)
        message.success("Availability updated",1)
    }

    const deleteProduct =async () =>{
        await productFacade.deleteProduct(id)

        await router.push("/admin/products")
    }

    return (
        <AdminLayout>
            <Container>
                <Row className="my-4">
                    <Col>
                        <Button variant="secondary" onClick={goBack}>Go Back</Button>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col md={6}>
                        <Image src={product.imgUrl} alt={product.name} fluid />
                    </Col>
                    <Col md={6} className={"shadow p-3 bg-white rounded"}>
                        <h5>Update the product:</h5>
                        <form className="w-100" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Product Name</label>
                                <input type="text" className="form-control" id="name" value={product.name || ''} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Image Url:</label>
                                <input type="text" className="form-control" id="imgUrl" value={product.imgUrl} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="brandId" className="form-label">Brand</label>
                                <select className="form-control" id="brandId" value={product.brandId} onChange={handleChange} required>
                                    <option value="">Choose brand</option>
                                    {brands && brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" value={product.price || ''} onChange={handleChange} required min="0" step="0.01" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" value={product.description || ''} onChange={handleChange} rows="4" required></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categoryId" className="form-label">Category</label>
                                <select className="form-control" id="categoryId" value={product.categoryId} onChange={handleChange} required>
                                    <option value="">Choose category</option>
                                    {categories && categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <Row>
                                <Col>

                            <div>
                                <Button variant="danger" onClick={deleteProduct} className="float-start">Delete</Button>
                            </div>
                                </Col>
                                <Col>

                            <div>
                                <Button type="submit" variant="success" className=" float-end">Save</Button>
                            </div>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>

                <Row className={""}>
                <Col></Col>
                <Col className={"shadow p-3 mb-5 bg-white rounded"}>
                    {availability &&
                <div className="mb-3">
                    <h5>Update the product availability:</h5>
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input type="number" className="form-control mb-3 w-50" id="quantity" value={availability.quantity} onChange={handleChangeAvailability} required min="0" />

                    <Button type="submit" variant="success" onClick={handleUpdateAvailability} className="float-end">Save</Button>
                </div>
                    }
                </Col>
                </Row>
            </Container>
        </AdminLayout>
    );
};

export default ProductDetails;