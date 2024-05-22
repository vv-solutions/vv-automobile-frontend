import {useContext, useState} from 'react';
import cartFacade from "../facades/cartFacade";
import {CartContext} from "../Context/CartContext";
import {LoadingOutlined} from "@ant-design/icons";

const AddToCart = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const {updateCartQuantity } = useContext(CartContext);

    const handleAddToCart = async (e) => {
        e.stopPropagation(); // Prevent the card click event
        setLoading(true);

        try {
            // Fetch current cart items to check if the product is already in the cart
            const cartItems = await cartFacade.fetchCartItems();
            const existingProduct = cartItems.find(item => String(item.productId) === String(product.id));
            if (existingProduct) {
                // Update quantity if the product is already in the cart
                const newQuantity = existingProduct.quantity + quantity;
                await cartFacade.updateCartItemQuantity(product.id, newQuantity);
            } else {
                // Add new product to the cart
                await cartFacade.addToCart(product.id, quantity, product.name, product.imgUrl, product.price);
            }
            // Update the cart quantity displayed in the application
            updateCartQuantity();
            await new Promise(resolve => setTimeout(resolve, 400)); // 1000 milliseconds (1 second)
        } catch (error) {
            console.error('Failed to add to cart:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="addToCartContainer">
            <input
                type="number"
                value={quantity}
                min="1"
                max="9999"
                step="1"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="quantityInput"
                style={{border: '1px solid #dcdcdc'}}
                onClick={(e) => e.stopPropagation()} // Prevent the card click event
            />
            <button
                onClick={handleAddToCart}
                className="addToCartButton w-100"
                disabled={loading}
                style={{height: '36px'}}
            >
                {loading ? <LoadingOutlined/> : 'Buy'}
            </button>
        </div>
    );
};

export default AddToCart;
