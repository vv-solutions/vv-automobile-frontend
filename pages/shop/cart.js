import {useRouter} from "next/router";
import productFacade from "../../facades/productFacade";
import {useState} from "react";

function CartPage() {
    const router = useRouter();

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

    // // Function to remove a product from the cart
    const handleRemoveItemFromCart = (product) => {
        // removeFromCart(product.id);
    };

    // Function to update the quantity of a product in the cart
    const HandleUpdateItemQuantity = (product, newQuantity) => {
        // if (newQuantity <= 0) {
        //     removeFromCart(product);
        // } else {
        //     updateCart(product, newQuantity);
        // }
    };

    // Calculate the total price of items in the cart
    const getTotalPrice = () => {
        // return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleCompleteOrder = async () => {
        let saleLines = []
        for (const cartItem of cart) {
            let saleLine = {}
            saleLine.productId = cartItem.id
            saleLine.quantity = cartItem.quantity
            saleLines.push(saleLine)
        }

        // let res = await orderFacade.createOrder(saleLines);
        // let orderId = res.msg;
        // localStorage.removeItem("cart")
        // await router.push({
        //     pathname: '/customerOrders/'+orderId,
        // });
    }


    return (
        <>
            <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded">
                <div>
                    <div className="order-steps-menu hidden-print mb-5">
                        <ul className="steps-list">
                            <li className="active">
                                <a href="/shop/cart" target="_top">Kurv</a>
                            </li>
                            <li className="disabled">
                                <a href="#" target="_top">Information</a>
                            </li>
                            <li className="disabled">
                                <a href="#">Bekræftelse</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={"w-75 m-auto"}>
                    <div className="cart-headlines">
                        <div className="header-item empty">&nbsp;</div>
                        <div className="header-item description">
                            <h4>Beskrivelse</h4>
                        </div>
                        <div className="header-item price">
                            <h4>Stk. pris</h4>
                        </div>
                        <div className="header-item amount">
                            <h4>Antal</h4>
                        </div>
                        <div className="header-item delete"></div>
                        <div className="header-item total">
                            <h4>Pris</h4>
                        </div>
                    </div>
                    {products.map((product) => (
                        <div className="cart-line" data-itemnr={product.item_number} key={product.id}>
                            <div className="cart-line__image">
                                <a href={product.url} target="_top" title={product.title}>
                                    <img src={product.image} alt={product.title}/>
                                </a>
                            </div>
                            <div className="cart-line__description">
                                <strong className="title">
                                    <a href={product.url} target="_top" title={product.title}>{product.title}</a>
                                </strong>
                                <small>Varenr.&nbsp;{product.item_number}</small>
                            </div>
                            <div className="cart-line__price">
                                Kr.&nbsp;{product.price}
                            </div>
                            <div className="cart-line__amount">
                                <button className="button minus">-</button>
                                <input type="text" value="1" className="amount-input" readOnly/>
                                <button className="button plus">+</button>
                            </div>
                            <div className="cart-line__delete">
                                <button className="button delete"><i className="fas fa-trash-alt"></i></button>
                            </div>
                            <div className="cart-line__total">
                                Kr.&nbsp;{product.price}
                            </div>
                        </div>))}

                    {/*<div className="row">*/}
                    {/*    {cartProducts.map((product) => (*/}
                    {/*        <div key={product.id} className="col-md-4 mb-4">*/}
                    {/*            <div className="card">*/}
                    {/*                <img src={product.imgUrl} alt={product.name} className="card-img-top w-25"  />*/}
                    {/*                <div className="card-body">*/}
                    {/*                    <h5 className="card-title">{product.name}</h5>*/}
                    {/*                    <p className="card-text p1 m-0">Unit price: ${product.price}</p>*/}
                    {/*                    <p className="card-text p1 m-0">Total price: ${(product.price * product.quantity).toFixed(2)}</p>*/}
                    {/*                    <div className="d-flex align-items-center justify-content-between">*/}
                    {/*                        <div className="quantity">*/}
                    {/*                            <button*/}
                    {/*                                className="btn btn-light"*/}
                    {/*                                onClick={() => HandleUpdateItemQuantity(product, product.quantity - 1)}*/}
                    {/*                            >*/}
                    {/*                                -*/}
                    {/*                            </button>*/}
                    {/*                            <span className="mx-2">{product.quantity}</span>*/}
                    {/*                            <button*/}
                    {/*                                className="btn btn-light"*/}
                    {/*                                onClick={() =>HandleUpdateItemQuantity(product, product.quantity + 1)}*/}
                    {/*                            >*/}
                    {/*                                +*/}
                    {/*                            </button>*/}
                    {/*                        </div>*/}
                    {/*                        <button*/}
                    {/*                            className="btn btn-danger"*/}
                    {/*                            onClick={() => handleRemoveItemFromCart(product)}*/}
                    {/*                        >*/}
                    {/*                            Remove*/}
                    {/*                        </button>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    <div className="summary">
                        <div className="row">
                            <div className="main-content col-md-7 col-md-pull-5">

                            </div>

                            <div className="shopping-cart-summary col-md-5 col-md-push-7">
                                <div className="row total">
                                    <div className="col-md-6 col-xs-7">
                                        <strong>Total</strong>
                                    </div>
                                    <div className="col-md-6 col-xs-5 price price-hidden">
                                        <span className="price">Kr.&nbsp;13.081,00</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {cartProducts.length > 0 &&
                            <button onClick={handleCompleteOrder} className="btn btn-success">To checkout</button>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default CartPage;