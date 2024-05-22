import {useRouter} from "next/router";
import {Button, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import AddToCart from "../../components/AddToCart";
import productFacade from "../../facades/productFacade";
import { Rate } from "antd";
import {forEach} from "react-bootstrap/ElementChildren";
import brandFacade from "../../facades/brandFacade";
import reviewFacade from "../../facades/ReviewFacade";
import ProductCarousel from "../../components/ProductCarousel";
function Index() {


    const [product, setProduct ] = useState();
    const router = useRouter();
    const [brand,setBrand] = useState({name:"loading. . ."})
    const[search,setSearch] = useState();
    // const { addToCart } = useCart();
    const { id } = router.query;
    const [reviews,setReviews] = useState()
    const [createReview,setCreateReview] = useState({rating:0,email:"",description:""});
    const [avgRating,setAvgRating] = useState(0);
    const [recommendedProducts,setRecommendedProducts] = useState();

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
        if(router.query.id) {
            fetchData();
        }


    }, [router.isReady,router.query.id]);

    const fetchData = async (fetchProductData) => {
        let product = await productFacade.getProductById(id)
        setProduct(product)
        await brandFacade.getBrandById(product.brandId).then(setBrand)
        let r;
        await reviewFacade.getReviewsByProductId(id).then((re) => r = re)
        setReviews(r)
        getAvgRating(r)
        await reviewFacade.getRecommendedById(id).then(setRecommendedProducts)
    }

    const getAvgRating = (r) => {

        // Extracting the ratings
        const ratings = r.map(review => review.rating);

        // Calculating the mean rating
        const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
        const meanRating = totalRating / ratings.length;
        console.log(`rating ${meanRating}`)
        setAvgRating(meanRating)

    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCreateReview((createReview) => ({
            ...createReview,
            [id]: value
        }));
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        let toCreate = createReview;

        toCreate["productId"] = id;
        let newReview;
        await reviewFacade.createReview(toCreate).then((r)=> newReview = r )

        let updated = reviews;
        updated.unshift(newReview)
        setReviews(updated)
        getAvgRating(updated)
        setCreateReview({rating:0,email:"",description:""})
    }



    return(
        <>
            {product &&
            <div className="productContainer">
                <Row>
                    <div className="shadow p-3 mb-5 bg-white rounded">
                <div className="productDetails">
                    <img className="productImage" src={product.imgUrl} alt={product.name} />
                    <div className="productInfo">
                        <h1 className="productName">{product.name}</h1>
                            <p>{brand.name}</p>
                            <p className="productPrice">{product.price.toFixed(2)} DKK</p>

                        { reviews &&
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Rate disabled allowHalf value={avgRating} defaultValue={0} />
                                <p style={{ marginLeft: '10px', lineHeight: '24px', marginBottom: 0, color:"gray"}}>{reviews.length} reviews</p>
                            </div>
                        }
                        <div className={"w-50"}>
                        <AddToCart product={product}/>
                        </div>
                        <p className="" style={{color: getStockColor()}} >In Stock: {product.productAvailabilityQuantity}</p>
                    </div>
                </div>


                        <h5>Description:</h5>
                        <p className="productDescription" style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>{product.description}</p>
                    </div>
                </Row>

                <Row>
                    <div className="shadow p-3 mb-5 bg-white rounded">
                        <h5>Other people bought:</h5>
                        {recommendedProducts &&
                            <div className="mb-2 " style={{maxWidth:`${Math.min(recommendedProducts.length,5)/5*100}%`}}>
                            <ProductCarousel products={recommendedProducts}/>
                            </div>
                        }
                    </div>
                </Row>

                <Row className="shadow p-3 mb-5 bg-white rounded">
                    <h5 className="mb-3">Leave a review:</h5>
                    <Rate value={createReview.rating} onChange={(value) =>setCreateReview({...createReview,["rating"]:value}) } id="rating"/>
                    <form onSubmit={handleSubmitReview}>

                    <div className="mb-1 mt-4 w-50">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Email:</label>
                        <input className="form-control" id="email" required value={createReview.email} onChange={handleChange} type={"email"} ></input>
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Leave a comment:</label>
                        <textarea className="form-control" id="description" required value={createReview.description} onChange={handleChange} rows="3"></textarea>
                    </div>
                    <div className="float-end">
                        <Button className="btn-primary" type={"submit"}> submit</Button>
                    </div>

                    </form>
                </Row>
                <Row className="shadow p-3 mb-5 bg-white rounded">
                    <h5>Other people said: </h5>
                    {
                        reviews &&
                        reviews.map((r) =>(

                        <div key={r.email+r.description}>
                            <hr style={{borderBottom: "1px solid black"}}/>
                            <h6>{r.email}:</h6>
                            <Rate disabled defaultValue={r.rating}/>
                            <p>{r.description}</p>

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