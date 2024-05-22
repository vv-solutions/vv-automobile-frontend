import React, { createContext, useState, useEffect } from 'react';
import cartFacade from "../facades/cartFacade";

// Create a context for the cart
export const CartContext = createContext();

// Create a provider component to provide the cart state and functions
export const CartProvider = ({ children }) => {
    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(() => {
        updateCartQuantity(); // Fetch cart quantity when the component mounts
    }, []);

    const updateCartQuantity = async () => {
        try {
            const cartItems = await cartFacade.fetchCartItems();
            const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
            setCartQuantity(totalQuantity);
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartQuantity, updateCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
