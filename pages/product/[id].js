import {useRouter} from "next/router";
import {Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import AddToCart from "../../components/AddToCart";
import productFacade from "../../facades/productFacade";

function Index() {


    const [product, setProduct ] = useState();
    const router = useRouter();
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
            await productFacade.getProductById(id).then(setProduct)

        }
        if(router.query.id) {

            fetchProduct();
        }


    }, [router.isReady]);




    return(
        <>
            {product &&
            <div className="productContainer">
                <div className="productDetails">
                    <img className="productImage" src={product.imgUrl} alt={product.name} />
                    <div className="productInfo">
                        <h1 className="productName">{product.name}</h1>
                        <p className="productPrice">{product.price.toFixed(2)} DKK</p>
                        <div className={"w-50"}>
                        <AddToCart product={product}/>
                        </div>
                        <p className="" style={{color: getStockColor()}} >In Stock: {product.productAvailabilityQuantity}</p>
                    </div>
                </div>
                <p className="productDescription">{product.description}</p>
            </div>
            }
        </>
    )
}

export default Index;