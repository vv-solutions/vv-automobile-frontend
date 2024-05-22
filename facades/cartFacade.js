// cartFacade.js
import { makeOptions } from '../util/fetchUtil';

function cartFacade() {
    const URL = '/api/cart';

    async function fetchCartItems() {
        const opts = makeOptions('GET');
        return await fetch(URL, opts).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }

    async function addToCart(productId, quantity, name, imgUrl, pricePerUnit) {
        const opts = makeOptions('POST', { productId, quantity, name, imgUrl, pricePerUnit });
        return await fetch(URL, opts).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        });
    }

    async function updateCartItemQuantity(productId, quantity) {
        const opts = makeOptions('PUT', { productId, quantity });
        return await fetch(URL, opts).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        });
    }

    async function removeFromCart(productId) {
        const opts = makeOptions('DELETE', { productId });
        return await fetch(URL, opts).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        });
    }
    async function clearCart() {
        const opts = makeOptions('DELETE');
        return await fetch(URL, opts).then((r) => r.json());
    }


    return {
        fetchCartItems,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart
    };
}

const facade = cartFacade();
export default facade;
