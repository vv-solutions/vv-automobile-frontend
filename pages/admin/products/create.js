import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import { Card, Form, Input, InputNumber, message } from 'antd';
import productFacade from "../../../facades/productFacade";
import brandFacade from "../../../facades/brandFacade";
import categoryFacade from "../../../facades/categoryFacade";
import AdminLayout from "../../../components/adminLayout";
import {log} from "next/dist/server/typescript/utils";

const ProductCreate = () => {
    const router = useRouter();
    const [product, setProduct] = useState({
        name: '',
        imgUrl: '',
        brandId: '',
        price: '',
        description: '',
        categoryId: ''
    });
    const [categories, setCategories] = useState(null);
    const [brands, setBrands] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
            getData()

    }, []);


    const getData =async ()=>{
        await brandFacade.getAll().then(setBrands)
        await categoryFacade.getAll().then(setCategories)
    }

    const goBack = () => {
        router.back();
    };

    const handleSubmit =  async (e)=>{
        e.preventDefault();
        let createdProduct =  await productFacade.create(product)
        message.success("Product created",1)
        await router.push("/admin/products/"+createdProduct.id)
    }

    const handleChange = (e) =>{
        const id = e.target.id;
        const value = e.target.value;

        setProduct({...product,[id]:value})
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
                        <h5>Create product:</h5>
                        <form className="w-100" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Product Name</label>
                                <input type="text" className="form-control" id="name" value={product.name} onChange={handleChange} required />
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

                            <div>
                                <Button type="submit" variant="success" className=" float-end">Create</Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </AdminLayout>
    );
};

export default ProductCreate;