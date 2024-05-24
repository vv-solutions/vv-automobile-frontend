import redis from '../../lib/redis';
import { getSessionId } from '../../lib/cookies';
export default async (req, res) => {
    const sessionId = getSessionId(req, res);

    switch (req.method) {
        case 'GET':
            const cartItems = await redis.hgetall(`cart:${sessionId}`);
            const formattedCartItems = Object.entries(cartItems).map(([productId, quantity]) => {
                return { productId, quantity: parseInt(quantity, 10) };
            });
            res.status(200).json(formattedCartItems);
            break;
        case 'POST':
            const { productId, quantity } = req.body;
            await redis.hset(`cart:${sessionId}`, productId, quantity.toString());
            res.status(200).json({ message: 'Item added to cart' });
            break;
        case 'PUT':
            const { productId: updateProductId, quantity: newQuantity } = req.body;
            const existingQuantity = await redis.hget(`cart:${sessionId}`, updateProductId);
            if (existingQuantity !== null) {
                await redis.hset(`cart:${sessionId}`, updateProductId, newQuantity.toString());
                res.status(200).json({ message: 'Item quantity updated' });
            } else {
                res.status(404).json({ message: 'Item not found in cart' });
            }
            break;
        case 'DELETE':
            const { productId: deleteProductId } = req.body;
            if (deleteProductId) {
                // Delete individual item from cart
                await redis.hdel(`cart:${sessionId}`, deleteProductId);
                res.status(200).json({ message: 'Item removed from cart' });
            } else {
                // Clear the entire cart
                await redis.del(`cart:${sessionId}`);
                res.status(200).json({ message: 'Cart cleared' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
