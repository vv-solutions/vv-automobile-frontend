import {useRouter} from "next/router";
import productFacade from "../../facades/productFacade";
import {useState} from "react";
import CartComponent from "../../components/CartComponent";
import OrderComponent from "../../components/OrderComponent";
import categoryFacade from "../../facades/categoryFacade";
import ConfirmationComponent from "../../components/ConfirmationComponent";

function CartPage() {
    const router = useRouter();

    const [showPage, setShowPage] = useState(1)

    // const [saleLine, setSaleLine] = useState({
    //     productId: '',
    //     quantity:'',
    // });
    const products = [
        {
            image: 'https://dyncdn.thg.dk/img/974151665032_0_S_135_240.JPG',
            title: 'Continental - 165/70-14 81T UltraContact',
            item_number: '974141670034',
            url: '/bil/daek-og-faelge/sommerdaek/14-daek/continental-165-70-14-81t-ultracontact/n-1930767459/pn-233806010',
            price: 699
        }
    ];
    const [cartProducts, setCartProducts] = useState([
        {
            "id": 21,
            "name": "Jerry can gasket",
            "quantity": 2,
            "brandId": 32,
            "price": 14.9,
            "description": "Gasket suitable for Jerry Can 39-102 and 39-103.",
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/39-164_xl_1.jpg",
            "categoryId": 1,
            "productAvailabilityQuantity": 146,
            "createTimestamp": "2023-05-15T15:12:27"
        },
        {
            "id": 43,
            "name": "Valve caps, Skull, 4-pack",
            "quantity": 3,
            "brandId": 17,
            "price": 14.9,
            "description": "Plastic valve caps with inserts which prevent the caps from sticking to the threads due to corrosion.",
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/30-212_xl_1.jpg",
            "categoryId": 1,
            "productAvailabilityQuantity": 9,
            "createTimestamp": "2023-05-15T15:12:27"
        },
        {
            "id": 72,
            "name": "Ice Scraper",
            "quantity": 1,
            "brandId": 4,
            "price": 14.9,
            "description": "Plastic.",
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/37-450_xl_1.jpg",
            "categoryId": 1,
            "productAvailabilityQuantity": 103,
            "createTimestamp": "2023-05-15T15:12:27"
        },
        {
            "id": 64,
            "name": "Aluminium blanket, 140 x 220 cm",
            "quantity": 4,
            "brandId": 32,
            "price": 19.9,
            "description": "Good to have with you when trekking and having other outdoor adventures as well as in the car. Wrap it round the body to reflect the body warmth back, for example when someone is suffering from hypothermia or in shock. Can also be used for animals. Small-sized package, easy to carry around in your rucksack. Material: Aluminium-coated polythene.Warning! Flammable product, keep it away from naked flames. Do not cover the face with the product as it may cause suffocation.",
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/40-182_xl_1.jpg",
            "categoryId": 1,
            "productAvailabilityQuantity": 22,
            "createTimestamp": "2023-05-15T15:12:27"
        },
        {
            "id": 69,
            "name": "Universal Tank Cap",
            "quantity": 1,
            "brandId": 4,
            "price": 19.9,
            "description": "Emergency tank cap for temporary use. Plastic.",
            "imgUrl": "https://productimages.biltema.com/v1/image/imagebyfilename/33-591_xl_1.jpg",
            "categoryId": 1,
            "productAvailabilityQuantity": 52,
            "createTimestamp": "2023-05-15T15:12:27"
        },
        {
            "id": 7,
            "name": "Car make-up mirror",
            "quantity": 2,
            "brandId": 39,
            "price": 22.9,
            "description": "Self-adhesive mirror for fitting to e.g. sun visors.",
            "imgUrl": "https://productimages.biltema.com/v1/Image/product/xlarge/2000034942/4",
            "categoryId": 1,
            "productAvailabilityQuantity": 148,
            "createTimestamp": "2023-05-15T15:12:27"
        }]);


    const [order, setOrder] = useState({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            street: "",
            houseNumber: "",
            addressLine2: "",
            zipcode: "",
            orderLines:
                [
                    {
                        "productId": 1,
                        "quantity": 5
                    },
                    {
                        "productId": 3,
                        "quantity": 1
                    }
                ]
        }
    )
    const [createdOrder, setCreatedOrder] = useState()


    const nextPage = () => {
        setShowPage(showPage + 1)
    }
    const prevPage = () => {
        setShowPage(showPage - 1)
    }

    return (
        <>
            <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded">
                {showPage == 1 &&
                    <CartComponent products={cartProducts} nextPage={nextPage} order={order} setOrder={setOrder}/>
                }
                {showPage == 2 &&
                    <OrderComponent nextPage={nextPage} prevPage={prevPage} order={order} setOrder={setOrder} setCreatedOrder={setCreatedOrder}/>
                }
                {(showPage == 3 && createdOrder) &&
                    <ConfirmationComponent order={createdOrder}/>
                }

            </div>

        </>
    )
}

export default CartPage;