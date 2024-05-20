import {useEffect, useState} from "react";
import {Button, Form, Row} from "react-bootstrap";

import {useRouter} from "next/router";
import productFacade from "../../facades/productFacade";
import ProductGrid from "../../components/ProductGrid";

function Index() {

    const[result, setResult] = useState("")
    const [products, setProducts ] = useState([]);
    const router = useRouter();
    const[search,setSearch] = useState();
    const[searchProducts,setSearchProducts] = useState([
        {
            "name": "Driveway mirror, 310 mm",
            "description": "A convex mirror which improves visibility and thereby increases safety for garage driveways, parking areas, street corners, etc. Easy to mount with the included adjustable bracket.",
            "price": 199.0,
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/38-781_xl_1.jpg",
            "category_id": 1,
            "id": 1,
            "date_added": "2023-05-15 15:12:27",
            "stock": 18
        },
        {
            "name": "Caravan rear-view mirror, split",
            "description": "Universal model with double mirror, the outer mirror is adjustable and increases the viewing area to the rear. Easy fitting, with neoprene straps, for both right and left-hand sides. Dimensions for the entire mirror construction: 185 x 127 mm. Sold individually.",
            "price": 69.9,
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/37-573_xl_1.jpg",
            "category_id": 1,
            "id": 2,
            "date_added": "2023-05-15 15:12:27",
            "stock": 29
        },
        {
            "name": "Stick-on mirror",
            "description": "For simple repair of broken and cracked side vehicle mirrors. Suitable for both cars and trucks. DIY kit containing one sheet of plastic mirror glass and double-sided adhesive tape. Vehicle mirrors are delivered with a layer of protective plastic to prevent scratches. Easy cutting, no special tools required. Not approved by Svensk Bilprovning (Swedish Vehicle Inspection Agency).",
            "price": 49.9,
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/33-710_xl_1.jpg",
            "category_id": 1,
            "id": 3,
            "date_added": "2023-05-15 15:12:27",
            "stock": 14
        },
        {
            "name": "Rear-view mirror, 180 x 55 mm",
            "description": "Rotatable mirror for attaching to the interior windscreen. Suitable as an extra mirror when e.g. practising to drive.",
            "price": 29.9,
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/33-112_xl_1.jpg",
            "category_id": 1,
            "id": 4,
            "date_added": "2023-05-15 15:12:27",
            "stock": 16
        },
        {
            "name": "Rear-view mirror, 110 x 45 mm",
            "description": "Rotatable mirror for attaching to the interior windscreen. Suitable as an extra mirror when e.g. practising to drive.",
            "price": 24.9,
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/33-112_xl_1.jpg",
            "category_id": 1,
            "id": 5,
            "date_added": "2023-05-15 15:12:27",
            "stock": 24
        },
        {
            "name": "Wide-angle mirror",
            "description": "For mounting to existing side mirrors. Provides a better view when e.g. overtaking and parking. Fittings included.",
            "price": 36.9,
            "imgUrl": "https://productimages.biltema.com/v1/Image/product/xlarge/2000034853/4",
            "category_id": 1,
            "id": 6,
            "date_added": "2023-05-15 15:12:27",
            "stock": 8
        },
        {
            "name": "Car make-up mirror",
            "description": "Self-adhesive mirror for fitting to e.g. sun visors.",
            "price": 22.9,
            "imgUrl": "https://productimages.biltema.com/v1/Image/product/xlarge/2000034942/4",
            "category_id": 1,
            "id": 7,
            "date_added": "2023-05-15 15:12:27",
            "stock": 39
        },
        {
            "name": "Rear-view mirror, 80 x 50 mm",
            "description": "Small, flexible extra mirror for a greater rear field of view. Supplied with two fasteners, suction cup and clip.",
            "price": 42.9,
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/33-115_xl_1.jpg",
            "category_id": 1,
            "id": 8,
            "date_added": "2023-05-15 15:12:27",
            "stock": 9
        },
        {
            "name": "Wide-angle mirror",
            "description": "\"To see the \"\"blind spot\"\". Mounted to the outer/interior rear-view mirror. Self-adhesive.\"",
            "price": 22.9,
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/33-123_xl_1.jpg",
            "category_id": 1,
            "id": 9,
            "date_added": "2023-05-15 15:12:27",
            "stock": 30
        },
        {
            "name": "Fuel Can, 20 l",
            "description": "Plastic. Equipped with a carry handle and flexible extension pipe for simple, no-spill filling.",
            "price": 129.0,
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/39-253_xl_1.jpg",
            "category_id": 1,
            "id": 10,
            "date_added": "2023-05-15 15:12:27",
            "stock": 31
        },
        {
            "name": "Fuel Can, 10 l",
            "description": "Plastic. Equipped with a carry handle and flexible extension pipe for simple, no-spill filling.",
            "price": 54.9,
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/39-256_xl_1.jpg",
            "category_id": 1,
            "id": 11,
            "date_added": "2023-05-15 15:12:27",
            "stock": 26
        },
        {
            "name": "Jerry Can, 20 l",
            "description": "Classic army model in painted sheet steel. With rustproofed interior. Suitable for petrol, diesel, ethanol and oil. UN-certified.",
            "price": 199.0,
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/39-103_xl_1.jpg",
            "category_id": 1,
            "id": 12,
            "date_added": "2023-05-15 15:12:27",
            "stock": 31
        },
        {
            "name": "Fuel Can, 5 l",
            "description": "Plastic. Equipped with a carry handle and flexible extension pipe for simple, no-spill filling.",
            "price": 34.9,
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/39-255_xl_1.jpg",
            "category_id": 1,
            "id": 13,
            "date_added": "2023-05-15 15:12:27",
            "stock": 28
        },
        {
            "name": "Jerry can, 20 l",
            "description": "Classic army style jerrycan made of plastic. Can be used for petrol and diesel. Flexible spout included.",
            "price": 149.0,
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/39-267_xl_1.jpg",
            "category_id": 1,
            id: 14,
            "date_added": "2023-05-15 15:12:27",
            "stock": 36
        }
    ]);
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


    const handleSearch = (e) => {
        setSearchProducts(products.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return(
        <>
            <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded w-75 m-auto">
                <h1 className="text-center mb-4">Products</h1>
                <Form>
                    <Form.Group className="mb-4" controlId="start">
                        <Form.Control required type="text" onChange={handleSearch} placeholder="Search" />
                    </Form.Group>
                </Form>
                <Row>

              <ProductGrid products={searchProducts}/>
                </Row>
                </div>
        </>
    )
}

export default Index;