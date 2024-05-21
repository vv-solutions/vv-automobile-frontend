import {useRouter} from "next/router";
import {Button, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import AddToCart from "../../components/AddToCart";
import productFacade from "../../facades/productFacade";
import { Rate } from "antd";
import {forEach} from "react-bootstrap/ElementChildren";
import brandFacade from "../../facades/brandFacade";
function Index() {


    const [product, setProduct ] = useState();
    const router = useRouter();
    const [brand,setBrand] = useState({name:"loading. . ."})
    const[search,setSearch] = useState();
    // const { addToCart } = useCart();
    const { id } = router.query;


    const getStockColor = () =>{
        console.log("colled")
        if(product.productAvailabilityQuantity > 10){
            return "green";
        } else if(product.productAvailabilityQuantity > 0){
            return "orange"
        } else {
            return "red";
        }


    }
    useEffect(() => {

        const fetchProduct = async () => {
            let product = await productFacade.getProductById(id)
            setProduct(product)
            await brandFacade.getBrandById(product.brandId).then(setBrand)

        }
        if(router.query.id) {

            fetchProduct();
        }


    }, [router.isReady]);

    const [reviews,setReviews] = useState([
        // {
        //     "email": "john.doe@example.com",
        //     "rating": 5,
        //     "comment": "Fantastic product! Exceeded my expectations in every way."
        // },
        // {
        //     "email": "jane.smith@example.com",
        //     "rating": 4,
        //     "comment": "Great value for the price. Would highly recommend."
        // },
        // {
        //     "email": "sam.wilson@example.com",
        //     "rating": 3,
        //     "comment": "Average experience. Some features could be improved."
        // },
        {
            "email": "lisa.jones@example.com",
            "rating": 2,
            "comment": "Not very satisfied. The product did not meet my needs."
        },
        {
            "email": "mike.brown@example.com",
            "rating": 2,
            "comment": "Terrible quality. Would not buy again."
        },
        {
            "email": "emma.watson@example.com",
            "rating": 2,
            "comment": "Absolutely love it! Will definitely purchase more in the future."
        },
        {
            "email": "david.taylor@example.com",
            "rating": 2,
            "comment": "Very good product, but there's room for improvement."
        },
        {
            "email": "olivia.martin@example.com",
            "rating": 2,
            "comment": "It’s okay. Does the job but nothing spectacular."
        },
        {
            "email": "noah.clark@example.com",
            "rating": 2,
            "comment": "Not impressed. There are better options available."
        },
        {
            "email": "sophia.lewis@example.com",
            "rating": 1,
            "comment": "Very disappointed. Complete waste of money."
        }
        ])

    const getRating = () => {

        // Extracting the ratings
        const ratings = reviews.map(review => review.rating);

        // Calculating the mean rating
        const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
        const meanRating = totalRating / ratings.length;
        console.log(`rating ${meanRating}`)
        return meanRating

    }


    return(
        <>
            {product &&
            <div className="productContainer">
                <div className="productDetails">
                    <img className="productImage" src={product.imgUrl} alt={product.name} />
                    <div className="productInfo">
                        <h1 className="productName">{product.name}</h1>
                            <p>{brand.name}</p>
                            <p className="productPrice">{product.price.toFixed(2)} DKK</p>

                        { reviews &&
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Rate disabled allowHalf defaultValue={getRating} />
                                <p style={{ marginLeft: '10px', lineHeight: '24px', marginBottom: 0, color:"gray"}}>{reviews.length} reviews</p>
                            </div>
                        }
                        <div className={"w-50"}>
                        <AddToCart product={product}/>
                        </div>
                        <p className="" style={{color: getStockColor()}} >In Stock: {product.productAvailabilityQuantity}</p>
                    </div>
                </div>
                <Row>
                    <div className="shadow p-3 mb-5 bg-white rounded">
                        <h5>Description:</h5>
                        <p className="productDescription" style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>{product.description}</p>
                    </div>
                </Row>

                <Row className="shadow p-3 mb-5 bg-white rounded">
                    <h5 className="mb-3">Leave a review:</h5>
                    <Rate/>
                    <div className="mb-1 mt-4 w-50">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Email:</label>
                        <input className="form-control" type={"text"} ></input>
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Leave a comment:</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div className="float-end">
                        <Button className="btn-primary"> submit</Button>
                    </div>
                </Row>
                <Row className="shadow p-3 mb-5 bg-white rounded">
                    <h5>Other people said: </h5>
                    { reviews.map((r) =>(

                        <div key={r.email+r.comment}>
                            <hr style={{borderBottom: "1px solid black"}}/>
                            <h6>{r.email}:</h6>
                            <Rate disabled defaultValue={r.rating}/>
                            <p>{r.comment}</p>

                        </div>
                    ))
                    }
                </Row>
            </div>
            }
        </>
    )
}

export default Index;