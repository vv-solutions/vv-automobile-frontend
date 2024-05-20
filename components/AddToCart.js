
import { useState } from 'react';
const AddToCart = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent the card click event
        setLoading(true);
        // Simulate an API call
        setTimeout(() => {
            setLoading(false);
            alert(`Added ${quantity} of ${product.name} to cart.`);
        }, 1000);
    };

    return (
        <div className="addToCartContainer">
            <input
                type="number"
                value={quantity}
                min="1"
                max="9999"
                step="1"
                onChange={(e) => setQuantity(e.target.value)}
                className="quantityInput"
                style={{ border: '1px solid #dcdcdc' }}
                onClick={(e) => e.stopPropagation()} // Prevent the card click event

            />
            <button onClick={handleAddToCart} className="addToCartButton w-100">Buy</button>
        </div>
    );
};
export default AddToCart;