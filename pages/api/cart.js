import redis from '../../lib/redis';
import { getSessionId } from '../../lib/cookies';

export default async (req, res) => {
    const sessionId = getSessionId(req, res);

    switch (req.method) {
        case 'GET':
            const cartItems = await redis.hgetall(`cart:${sessionId}`);
            const formattedCartItems = Object.entries(cartItems).map(([productId, data]) => {
                const { quantity, name, imgUrl, pricePerUnit } = JSON.parse(data);
                return { productId, quantity, name, imgUrl, pricePerUnit };
            });
            res.status(200).json(formattedCartItems);
            break;
        case 'POST':
            const { productId, quantity, name, imgUrl, pricePerUnit } = req.body;
            // await redis.hset(`cart:${sessionId}`, itemId, quantity);
            await redis.hset(`cart:${sessionId}`, productId, JSON.stringify({ quantity, name, imgUrl, pricePerUnit }));
            res.status(200).json({ message: 'Item added to cart' });
            break;

        case 'PUT':
            const { productId: updateProductId, quantity: newQuantity } = req.body;
            const existingItem = await redis.hget(`cart:${sessionId}`, updateProductId);
            if (existingItem) {
                const { name, imgUrl, pricePerUnit } = JSON.parse(existingItem);
                await redis.hset(`cart:${sessionId}`, updateProductId, JSON.stringify({ quantity: newQuantity, name, imgUrl, pricePerUnit }));
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
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
