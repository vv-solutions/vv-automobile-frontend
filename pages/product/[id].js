import {useRouter} from "next/router";
import {Form} from "react-bootstrap";
import {useEffect, useState} from "react";

function Index() {


    const [product, setProduct ] = useState({
        name: "Fuel Can, 5 l",
        description: "Plastic. Equipped with a carry handle and flexible extension pipe for simple, no-spill filling.",
        price: 34.9,
        imgUrl: "https://productimages.biltema.com/v1/image/imagebyfilename/39-255_xl_1.jpg",
        category_id: 1,
        id: 13,
        date_added: "2023-05-15 15:12:27",
        stock: 28
    });
    const router = useRouter();
    const[search,setSearch] = useState();
    // const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            // productFacade.getAllProducts().then((p) =>{
            //     setProducts(p)
            //     setSearchProducts(p)
            // })

        }
        // fetchProducts();
    }, []);




    return(
        <>
            <div className="productContainer">
                <h1 className="productName">{product.name}</h1>
                <div className="productDetails">
                    <img className="productImage" src={product.imgUrl} alt={product.name} />
                    <div className="productInfo">
                        <p className="productDescription">{product.description}</p>
                        <p className="productPrice">Price: {product.price.toFixed(2)} DKK</p>
                        <p className="productStock">In Stock: {product.stock}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index;