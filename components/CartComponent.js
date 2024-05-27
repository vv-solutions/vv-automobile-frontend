import { useEffect, useState, useContext } from "react";
import cartFacade from "../facades/cartFacade";
import { CartContext } from "../Context/CartContext";
import productFacade from "../facades/productFacade";

function CartComponent({ products, nextPage, order, setOrder }) {
    const [cart, setCart] = useState([]);
    const { updateCartQuantity } = useContext(CartContext);
    const [enrichedCart, setEnrichedCart] = useState([]);

    useEffect(() => {
        async function fetchCartData() {
            try {
                const cartItems = await cartFacade.fetchCartItems();
                setCart(cartItems);

                const productIds = cartItems.map(item => item.productId);
                const productDetails = await productFacade.getProductsByIds(productIds);

                // Merge the product details with cart quantities
                const enrichedCartData = cartItems.map(item => {
                    const productDetail = productDetails.find(p => p.id == item.productId);

                    return {
                        productId: item.productId,
                        name: productDetail.name,
                        imgUrl: productDetail.imgUrl,
                        pricePerUnit: parseFloat(productDetail.price),
                        quantity: item.quantity
                    };
                });

                setEnrichedCart(enrichedCartData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCartData();
    }, []);

    const handleUpdateQuantity = async (productId, newQuantity) => {
        try {
            await cartFacade.updateCartItemQuantity(productId, newQuantity);
            updateCartQuantity();

            // Update the quantity in the cart and enrichedCart directly
            setCart(prevCart =>
                prevCart.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );

            setEnrichedCart(prevEnrichedCart =>
                prevEnrichedCart.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const handleIncrementQuantity =async (productId) => {
        const product = cart.find(item => item.productId === productId);
        if (product) {
            const newQuantity = product.quantity + 1;
            await handleUpdateQuantity(productId, newQuantity);
        }
    };

    const handleDecrementQuantity =async (productId) => {
        const product = cart.find(item => item.productId === productId);
        if (product) {
            const newQuantity = Math.max(0, product.quantity - 1);
            if (newQuantity === 0) {
                await handleRemoveFromCart(productId);
            } else {
                await handleUpdateQuantity(productId, newQuantity);
            }
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            await cartFacade.removeFromCart(productId);
            updateCartQuantity();
            setCart(prevCart => prevCart.filter(item => item.productId !== productId));
            setEnrichedCart(prevEnrichedCart => prevEnrichedCart.filter(item => item.productId !== productId));
        } catch (error) {
            console.error('Failed to remove from cart:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await handleRemoveFromCart(productId);
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const handleNextPage = () => {
        // Extract product IDs and quantities from cart items
        const updatedOrderLines = cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));

        setOrder(prevOrder => ({
            ...prevOrder,
            orderLines: updatedOrderLines
        }));
        nextPage();
    };

    const calculateTotalPrice = () => {
        return enrichedCart.reduce((total, product) => {
            return total + product.quantity * product.pricePerUnit;
        }, 0).toFixed(2);
    };

    return (
        <>
            {/*<div>*/}
            {/*    <div className="order-steps-menu hidden-print mb-5">*/}
            {/*        <h5 className={"text-start w-75 m-auto"} style={{ color: "white" }}>.</h5>*/}
            {/*        <ul className="steps-list">*/}
            {/*            <li className="active">Cart</li>*/}
            {/*            <li className="disabled">Information</li>*/}
            {/*            <li className="disabled">Confirmation</li>*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="w-75 m-auto">
                <div className="cart-headlines">
                    <div className="header-item description">
                        <h4>Product</h4>
                    </div>
                    <div className="header-item price">
                        <h4>Unit price</h4>
                    </div>
                    <div className="header-item amount">
                        <h4>Quantity</h4>
                    </div>
                    <div className="header-item delete">
                        <h4>&nbsp;</h4>
                    </div>
                    <div className="header-item total">
                        <h4>Price</h4>
                    </div>
                </div>

                {enrichedCart && enrichedCart.map((product) => (
                    <div className="cart-line" key={product.productId}>
                        <div className="cart-line__description">
                            <strong className="title">
                                <img src={product.imgUrl} alt={product.name} style={{ width: 110, paddingRight: 30 }} />
                                <a href={product.url} target="_top" title={product.name}>{product.name}</a>
                            </strong>
                        </div>
                        <div className="cart-line__price">
                            {isNaN(product.pricePerUnit) ? 0 : product.pricePerUnit.toFixed(2)} DKK
                        </div>
                        <div className="cart-line__amount">
                            <button className="button button_minus"
                                    onClick={() => handleDecrementQuantity(product.productId)}>-</button>
                            <input type="text" value={product.quantity} className="amount-input" readOnly />
                            <button className="button button_plus"
                                    onClick={() => handleIncrementQuantity(product.productId)}>+</button>
                        </div>
                        <div className="cart-line__delete">
                            <button className="button button_delete"
                                    onClick={() => handleDeleteProduct(product.productId)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                        <div className="cart-line__total">
                            {(product.quantity * product.pricePerUnit).toFixed(2)} DKK
                        </div>
                    </div>
                ))}

                <div className="summary">
                    <div className="row">
                        <div className="main-content col-md-7 col-md-pull-5"></div>
                        <div className="shopping-cart-summary col-md-5 col-md-push-7">
                            <div className="row total_price_row">
                                <div className="col-md-6 col-xs-7">
                                    <strong>Total</strong>
                                </div>
                                <div className="col-md-6 col-xs-5 price price-hidden">
                                    <span className="price">{calculateTotalPrice()} DKK</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"text-end"}>
                    {cart.length > 0 &&
                        <button onClick={handleNextPage} className="btn btn-success">To checkout</button>
                    }
                </div>
            </div>
        </>
    );
}

export default CartComponent;

